import { useCallback } from 'react'
import { useGeolocation } from '../geolocation/useGeolocation'

const PERMISSIONS_REQUESTED_KEY = 'manadaSolidaria:permissionsRequested'

function hasRequestedPermissions() {
  try {
    return localStorage.getItem(PERMISSIONS_REQUESTED_KEY) === 'true'
  } catch {
    return false
  }
}

function markPermissionsRequested() {
  try {
    localStorage.setItem(PERMISSIONS_REQUESTED_KEY, 'true')
  } catch {
    return
  }
}

export function useAppPermissions() {
  const { requestCoordinates } = useGeolocation()

  const requestLoginPermissions = useCallback(async () => {
    if (hasRequestedPermissions()) {
      return
    }

    markPermissionsRequested()
    await Promise.allSettled([requestCoordinates()])
  }, [requestCoordinates])

  return {
    requestLoginPermissions,
  }
}
