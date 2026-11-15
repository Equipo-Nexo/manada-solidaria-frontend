import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'

const source = readFileSync(new URL('../src/common/services/pushNotifications/subscriptionSync.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2023, module: ts.ModuleKind.ESNext },
})
const { startPushSubscriptionSync, runPushSubscriptionOperation } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

const flush = () => new Promise((resolve) => setImmediate(resolve))

function browser(t) {
  t.mock.timers.enable({ apis: ['setTimeout'] })
  const window = Object.assign(new EventTarget(), {
    setTimeout: (...args) => globalThis.setTimeout(...args),
    clearTimeout: (timer) => globalThis.clearTimeout(timer),
  })
  const document = Object.assign(new EventTarget(), { visibilityState: 'visible' })
  const navigator = { onLine: true }
  const descriptors = new Map()
  for (const [name, value] of Object.entries({ window, document, navigator })) {
    descriptors.set(name, Object.getOwnPropertyDescriptor(globalThis, name))
    Object.defineProperty(globalThis, name, { configurable: true, value })
  }
  let stop = () => {}
  t.after(() => {
    stop()
    for (const [name, descriptor] of descriptors) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor)
      else delete globalThis[name]
    }
  })
  return {
    window, document, navigator,
    start: (sync) => {
      stop = startPushSubscriptionSync(sync)
      return stop
    },
    tick: async (ms) => {
      t.mock.timers.tick(ms)
      await flush()
    },
  }
}

test('restores the existing endpoint on start and after returning to the app', async (t) => {
  const app = browser(t)
  const backend = new Set()
  const subscription = { endpoint: 'https://push.example/device-1' }
  let calls = 0
  app.start(async () => {
    calls++
    backend.add(subscription.endpoint)
    return true
  })
  await flush()
  assert.equal(backend.has(subscription.endpoint), true)

  backend.clear()
  app.document.visibilityState = 'hidden'
  app.document.dispatchEvent(new Event('visibilitychange'))
  app.document.visibilityState = 'visible'
  app.document.dispatchEvent(new Event('visibilitychange'))
  app.window.dispatchEvent(new Event('focus'))
  await app.tick(250)

  assert.equal(calls, 2)
  assert.equal(backend.size, 1)
  assert.equal(backend.has(subscription.endpoint), true)
})

test('reconciles again after five minutes while the app stays visible', async (t) => {
  const app = browser(t)
  let registered = false
  app.start(async () => { registered = true; return true })
  await flush()
  registered = false
  await app.tick(300_000)
  assert.equal(registered, true)
})

test('retries failures with exponential backoff capped at five minutes', async (t) => {
  const app = browser(t)
  let calls = 0
  app.start(async () => { calls++; throw new Error('Backend unavailable') })
  await flush()
  for (const delay of [5_000, 10_000, 20_000, 40_000, 80_000, 160_000, 300_000, 300_000]) {
    const previous = calls
    await app.tick(delay - 1)
    assert.equal(calls, previous)
    await app.tick(1)
    assert.equal(calls, previous + 1)
  }
})

test('waits for connectivity and a visible app before attempting registration', async (t) => {
  const app = browser(t)
  let calls = 0
  app.navigator.onLine = false
  app.document.visibilityState = 'hidden'
  app.start(async () => { calls++; return true })
  await flush()
  assert.equal(calls, 0)

  app.navigator.onLine = true
  app.window.dispatchEvent(new Event('online'))
  await app.tick(250)
  assert.equal(calls, 0)

  app.document.visibilityState = 'visible'
  app.document.dispatchEvent(new Event('visibilitychange'))
  await app.tick(250)
  assert.equal(calls, 1)

  app.navigator.onLine = false
  await app.tick(300_000)
  assert.equal(calls, 1)
  app.navigator.onLine = true
  app.window.dispatchEvent(new Event('online'))
  await app.tick(250)
  assert.equal(calls, 2)
})

test('does not start overlapping registrations when several resume events arrive', async (t) => {
  const app = browser(t)
  let finish
  let calls = 0
  app.start(() => {
    calls++
    return new Promise((resolve) => { finish = resolve })
  })
  app.window.dispatchEvent(new Event('focus'))
  app.window.dispatchEvent(new Event('online'))
  app.document.dispatchEvent(new Event('visibilitychange'))
  await app.tick(1_000)
  assert.equal(calls, 1)
  finish(true)
  await flush()
})

test('cleanup cancels retries, removes listeners, and aborts queued work', async (t) => {
  const app = browser(t)
  let calls = 0
  let signal
  const stop = app.start(async (currentSignal) => {
    calls++
    signal = currentSignal
    throw new Error('Offline')
  })
  await flush()
  stop()
  assert.equal(signal.aborted, true)
  app.window.dispatchEvent(new Event('focus'))
  app.window.dispatchEvent(new Event('online'))
  app.document.dispatchEvent(new Event('visibilitychange'))
  await app.tick(600_000)
  assert.equal(calls, 1)
})

test('keeps unsubscribe after an in-flight registration and does not restore a disabled subscription', async () => {
  const order = []
  let localSubscription = true
  let backendSubscription = false
  let finishRegistration
  const registration = runPushSubscriptionOperation(async () => {
    order.push('register-start')
    await new Promise((resolve) => { finishRegistration = resolve })
    backendSubscription = true
    order.push('register-end')
  })
  const removal = runPushSubscriptionOperation(async () => {
    backendSubscription = false
    localSubscription = false
    order.push('remove')
  })
  const retry = runPushSubscriptionOperation(async () => {
    if (localSubscription) backendSubscription = true
  })
  await flush()
  assert.deepEqual(order, ['register-start'])
  finishRegistration()
  await Promise.all([registration, removal, retry])
  assert.deepEqual(order, ['register-start', 'register-end', 'remove'])
  assert.equal(backendSubscription, false)
})

test('a failed operation does not block later subscription operations', async () => {
  const failed = runPushSubscriptionOperation(async () => { throw new Error('Failed') })
  const next = runPushSubscriptionOperation(async () => 'recovered')
  await assert.rejects(failed, /Failed/)
  assert.equal(await next, 'recovered')
})
