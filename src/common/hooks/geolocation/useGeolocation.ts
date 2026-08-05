import { useCallback, useState } from 'react'
import { useToast } from '../toast/useToast'

export type GeolocationStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unsupported'
  | 'unavailable'

export type GeolocationCoordinates = {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
}

export type GeolocationResult = {
  coordinates: GeolocationCoordinates | null
  status: GeolocationStatus
}

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 60_000,
  timeout: 10_000,
}

function mapPositionToCoordinates(position: GeolocationPosition): GeolocationCoordinates {
  const { coords } = position

  return {
    accuracy: coords.accuracy,
    altitude: coords.altitude,
    altitudeAccuracy: coords.altitudeAccuracy,
    heading: coords.heading,
    latitude: coords.latitude,
    longitude: coords.longitude,
    speed: coords.speed,
  }
}

export function useGeolocation() {
  const toast = useToast()
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null)
  const [status, setStatus] = useState<GeolocationStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const requestCoordinates = useCallback(() => {
    if (!navigator.geolocation) {
      const message = 'Tu navegador no permite compartir la ubicaci\u00f3n desde esta app.'
      setCoordinates(null)
      setError(message)
      setStatus('unsupported')
      toast.information('Ubicaci\u00f3n no disponible', message)

      return Promise.resolve<GeolocationResult>({
        coordinates: null,
        status: 'unsupported',
      })
    }

    setStatus('requesting')
    setError(null)

    return new Promise<GeolocationResult>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nextCoordinates = mapPositionToCoordinates(position)
          setCoordinates(nextCoordinates)
          setStatus('granted')
          resolve({ coordinates: nextCoordinates, status: 'granted' })
        },
        (geolocationError) => {
          const isPermissionDenied =
            geolocationError.code === GeolocationPositionError.PERMISSION_DENIED
          const nextStatus: GeolocationStatus = isPermissionDenied ? 'denied' : 'unavailable'
          const message = isPermissionDenied
            ? 'Pod\u00e9s activarlo desde la configuraci\u00f3n del navegador para ver publicaciones cercanas.'
            : 'Vamos a intentarlo nuevamente cuando la app necesite publicaciones cercanas.'

          setCoordinates(null)
          setError(message)
          setStatus(nextStatus)

          if (isPermissionDenied) {
            toast.error('Permiso de ubicaci\u00f3n rechazado', message)
          } else {
            toast.information('No pudimos obtener tu ubicaci\u00f3n', message)
          }

          resolve({ coordinates: null, status: nextStatus })
        },
        GEOLOCATION_OPTIONS,
      )
    })
  }, [toast])

  return {
    coordinates,
    error,
    requestCoordinates,
    status,
  }
}
