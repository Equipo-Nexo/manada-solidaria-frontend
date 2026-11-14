const INITIAL_RETRY_DELAY_MS = 5_000
const MAX_RETRY_DELAY_MS = 5 * 60_000
const SYNC_INTERVAL_MS = 5 * 60_000
const RESUME_DELAY_MS = 250

let pendingOperation: Promise<unknown> = Promise.resolve()

// Serializa altas y bajas para que un reintento no vuelva a registrar el
// dispositivo mientras se desactivan los avisos.
export function runPushSubscriptionOperation<T>(operation: () => Promise<T>): Promise<T> {
  const result = pendingOperation.then(operation, operation)
  pendingOperation = result.catch(() => undefined)
  return result
}

export function startPushSubscriptionSync(
  sync: (signal: AbortSignal) => Promise<boolean>,
): () => void {
  const controller = new AbortController()
  let timer: number | undefined
  let isRunning = false
  let retryDelay = INITIAL_RETRY_DELAY_MS

  const canSync = () =>
    !controller.signal.aborted && navigator.onLine && document.visibilityState === 'visible'

  const schedule = (delay: number) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => {
      timer = undefined
      void attemptSync()
    }, delay)
  }

  async function attemptSync() {
    if (isRunning || !canSync()) return

    isRunning = true
    try {
      await sync(controller.signal)
      retryDelay = INITIAL_RETRY_DELAY_MS
      if (canSync()) schedule(SYNC_INTERVAL_MS)
    } catch {
      if (canSync()) {
        schedule(retryDelay)
        retryDelay = Math.min(retryDelay * 2, MAX_RETRY_DELAY_MS)
      }
    } finally {
      isRunning = false
    }
  }

  const resumeSync = () => {
    if (!isRunning && canSync()) schedule(RESUME_DELAY_MS)
  }

  window.addEventListener('online', resumeSync)
  window.addEventListener('focus', resumeSync)
  document.addEventListener('visibilitychange', resumeSync)
  void attemptSync()

  return () => {
    controller.abort()
    window.clearTimeout(timer)
    window.removeEventListener('online', resumeSync)
    window.removeEventListener('focus', resumeSync)
    document.removeEventListener('visibilitychange', resumeSync)
  }
}
