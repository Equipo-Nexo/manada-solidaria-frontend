const PASSKEY_PREFERENCE_STORAGE_KEY =
  'manadaSolidaria.auth.passkeyPreferred'

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function isPasskeyPreferred(): boolean {
  try {
    return getLocalStorage()?.getItem(PASSKEY_PREFERENCE_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function setPasskeyPreferred(preferred = true): void {
  try {
    const storage = getLocalStorage()

    if (!storage) return

    if (preferred) {
      storage.setItem(PASSKEY_PREFERENCE_STORAGE_KEY, 'true')
    } else {
      storage.removeItem(PASSKEY_PREFERENCE_STORAGE_KEY)
    }
  } catch {
    // Some privacy modes expose localStorage but reject access at runtime.
  }
}

export function clearPasskeyPreference(): void {
  setPasskeyPreferred(false)
}
