import { useCallback } from 'react'
import { useGeolocation } from '../geolocation/useGeolocation'

export function useAppPermissions() {
  const { requestCoordinates } = useGeolocation()

  const requestLoginPermissions = useCallback(async () => {
    await Promise.allSettled([requestCoordinates()])
  }, [requestCoordinates])

  return {
    requestLoginPermissions,
  }
}
