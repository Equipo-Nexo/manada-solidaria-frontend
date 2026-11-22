import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  clearPasskeyPreference,
  isPasskeyPreferred,
  setPasskeyPreferred,
} from '../src/auth/services/passkeyPreference.ts'
import { getPostAuthDestination } from '../src/auth/utils/authNavigation.ts'

const storageKey = 'manadaSolidaria.auth.passkeyPreferred'

function installWindow(t, localStorage) {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { localStorage },
  })

  t.after(() => {
    if (previousWindow) {
      Object.defineProperty(globalThis, 'window', previousWindow)
    } else {
      delete globalThis.window
    }
  })
}

function createStorage() {
  const values = new Map()

  return {
    getItem(key) {
      return values.get(key) ?? null
    },
    setItem(key, value) {
      values.set(key, String(value))
    },
    removeItem(key) {
      values.delete(key)
    },
  }
}

function createLocation(overrides = {}) {
  return {
    pathname: '/login',
    search: '',
    hash: '',
    state: null,
    key: 'test-location',
    ...overrides,
  }
}

test('reports no passkey preference when storage has no saved value', (t) => {
  installWindow(t, createStorage())

  assert.equal(isPasskeyPreferred(), false)
})

test('sets and clears the passkey preference', (t) => {
  const storage = createStorage()
  installWindow(t, storage)

  setPasskeyPreferred()
  assert.equal(storage.getItem(storageKey), 'true')
  assert.equal(isPasskeyPreferred(), true)

  clearPasskeyPreference()
  assert.equal(storage.getItem(storageKey), null)
  assert.equal(isPasskeyPreferred(), false)
})

test('fails safely when localStorage is blocked', (t) => {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const blockedWindow = {}

  Object.defineProperty(blockedWindow, 'localStorage', {
    get() {
      throw new DOMException('Storage access denied', 'SecurityError')
    },
  })
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: blockedWindow,
  })

  t.after(() => {
    if (previousWindow) {
      Object.defineProperty(globalThis, 'window', previousWindow)
    } else {
      delete globalThis.window
    }
  })

  assert.equal(isPasskeyPreferred(), false)
  assert.doesNotThrow(() => setPasskeyPreferred())
  assert.doesNotThrow(() => clearPasskeyPreference())
})

test('uses the post-authentication destination stored in navigation state', () => {
  const location = createLocation({
    state: {
      from: {
        pathname: '/animales/42',
        search: '?vista=historial',
        hash: '#vacunas',
      },
    },
  })

  assert.equal(
    getPostAuthDestination(location),
    '/animales/42?vista=historial#vacunas',
  )
})

test('prefers a safe internal redirect from the query string', () => {
  const redirect = '/campanias/123?origen=notificacion#detalle'
  const location = createLocation({
    search: `?redirect=${encodeURIComponent(redirect)}`,
    state: { from: { pathname: '/perfil' } },
  })

  assert.equal(getPostAuthDestination(location), redirect)
})

test('rejects an external redirect and falls back to the safe state destination', () => {
  const location = createLocation({
    search: `?redirect=${encodeURIComponent('https://example.com/phishing')}`,
    state: { from: { pathname: '/perfil/seguridad' } },
  })

  assert.equal(getPostAuthDestination(location), '/perfil/seguridad')
})
