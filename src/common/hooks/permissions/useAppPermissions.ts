import { useCallback } from 'react'
import { useGeolocation } from '../geolocation/useGeolocation'
import { useToast } from '../toast/useToast'

export type BrowserPermissionStatus = 'granted' | 'denied' | 'prompt' | 'unsupported' | 'unavailable'

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
  const toast = useToast()
  const { requestCoordinates } = useGeolocation()

  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      toast.information(
        'Notificaciones no disponibles',
        'Este navegador no permite recibir notificaciones push desde la app.',
      )
      return 'unsupported'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission === 'denied') {
      toast.error(
        'Notificaciones bloqueadas',
        'Activ\u00e1 el permiso desde la configuraci\u00f3n del navegador para recibir avisos importantes.',
      )
      return 'denied'
    }

    let permission: NotificationPermission

    try {
      permission = await Notification.requestPermission()
    } catch {
      toast.information(
        'Notificaciones pendientes',
        'El navegador puede pedir este permiso desde una acci\u00f3n dentro de la app.',
      )
      return 'unavailable'
    }

    if (permission === 'denied') {
      toast.error(
        'Notificaciones bloqueadas',
        'Activ\u00e1 el permiso desde la configuraci\u00f3n del navegador para recibir avisos importantes.',
      )
    }

    return permission
  }, [toast])

  const requestLoginPermissions = useCallback(async () => {
    if (hasRequestedPermissions()) {
      return
    }

    markPermissionsRequested()
    await Promise.allSettled([requestCoordinates(), requestNotificationPermission()])
  }, [requestCoordinates, requestNotificationPermission])

  return {
    requestLoginPermissions,
    requestNotificationPermission,
  }
}
