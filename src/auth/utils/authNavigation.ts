import type { Location } from 'react-router-dom'

export type AuthNavigationState = {
  from?: Pick<Location, 'pathname' | 'search' | 'hash'>
  usePassword?: boolean
}

const FALLBACK_DESTINATION = '/home'
const INTERNAL_ORIGIN = 'https://manada-solidaria.local'

function isSafeInternalPath(path: string): boolean {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return false
  }

  try {
    return new URL(path, INTERNAL_ORIGIN).origin === INTERNAL_ORIGIN
  } catch {
    return false
  }
}

function getPathFromState(state: AuthNavigationState): string | null {
  if (!state.from?.pathname) {
    return null
  }

  const path = `${state.from.pathname}${state.from.search ?? ''}${state.from.hash ?? ''}`
  return isSafeInternalPath(path) ? path : null
}

export function getAuthNavigationState(location: Location): AuthNavigationState {
  if (!location.state || typeof location.state !== 'object') {
    return {}
  }

  return location.state as AuthNavigationState
}

export function getPostAuthDestination(location: Location): string {
  const redirect = new URLSearchParams(location.search).get('redirect')

  if (redirect && isSafeInternalPath(redirect)) {
    return redirect
  }

  return getPathFromState(getAuthNavigationState(location)) ?? FALLBACK_DESTINATION
}
