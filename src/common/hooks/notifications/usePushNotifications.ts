import { useCallback, useEffect, useState } from 'react'
import {
  useRegisterPushSubscriptionMutation,
  useRemovePushSubscriptionMutation,
} from '@app/services/apis/pushNotificationsApi'
import {
  getCurrentSubscription,
  getPushNotificationStatus,
  isPushSupported,
  requestNotificationPermission,
  subscribeToPushNotifications,
  toPushSubscriptionRequest,
  unsubscribeFromPushNotifications,
} from '@common/services/pushNotifications/pushNotifications'
import type {
  PushActivationResult,
  PushNotificationStatus,
} from '@common/services/pushNotifications/types'
import { useToast } from '@hooks/toast/useToast'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY?.trim() ?? ''

export function usePushNotifications() {
  const toast = useToast()
  const [status, setStatus] = useState<PushNotificationStatus>('permission-default')
  const [isLoading, setIsLoading] = useState(true)
  const [registerSubscription] = useRegisterPushSubscriptionMutation()
  const [removeSubscription] = useRemovePushSubscriptionMutation()

  const refreshStatus = useCallback(async () => {
    setIsLoading(true)
    try {
      setStatus(await getPushNotificationStatus())
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void getPushNotificationStatus()
      .then(setStatus)
      .catch(() => setStatus(isPushSupported() ? 'not-subscribed' : 'unsupported'))
      .finally(() => setIsLoading(false))
  }, [])

  const syncExistingSubscription = useCallback(async (): Promise<boolean> => {
    if (!isPushSupported() || Notification.permission !== 'granted') return false

    const subscription = await getCurrentSubscription()
    if (!subscription) return false

    await registerSubscription(toPushSubscriptionRequest(subscription)).unwrap()
    setStatus('subscribed')
    return true
  }, [registerSubscription])

  const activate = useCallback(async (): Promise<PushActivationResult> => {
    if (!isPushSupported()) {
      setStatus('unsupported')
      toast.information(
        'Notificaciones no disponibles',
        'Este navegador o dispositivo no permite recibir notificaciones Web Push.',
      )
      return 'unsupported'
    }

    if (!VAPID_PUBLIC_KEY) {
      toast.error(
        'Notificaciones no configuradas',
        'Falta configurar la clave p\u00fablica VAPID de la aplicaci\u00f3n.',
      )
      return 'configuration-error'
    }

    setIsLoading(true)
    try {
      const permission = await requestNotificationPermission()

      if (permission === 'denied') {
        setStatus('permission-denied')
        toast.error(
          'Notificaciones bloqueadas',
          'Activ\u00e1 el permiso desde la configuraci\u00f3n del navegador para recibir avisos.',
        )
        return 'permission-denied'
      }

      if (permission !== 'granted') {
        setStatus('permission-default')
        return 'permission-default'
      }

      const subscription = await subscribeToPushNotifications(VAPID_PUBLIC_KEY)
      await registerSubscription(toPushSubscriptionRequest(subscription)).unwrap()
      setStatus('subscribed')
      toast.success(
        'Notificaciones activadas',
        'Vas a recibir avisos importantes aunque la aplicaci\u00f3n est\u00e9 cerrada.',
      )
      return 'subscribed'
    } catch {
      await refreshStatus()
      toast.error(
        'No pudimos activar las notificaciones',
        'La suscripci\u00f3n local se conservar\u00e1 para volver a intentarlo.',
      )
      return status
    } finally {
      setIsLoading(false)
    }
  }, [refreshStatus, registerSubscription, status, toast])

  const deactivate = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    try {
      const subscription = await getCurrentSubscription()

      if (subscription) {
        await removeSubscription({ endpoint: subscription.endpoint }).unwrap()
        await unsubscribeFromPushNotifications(subscription)
      }

      setStatus('not-subscribed')
      toast.success('Notificaciones desactivadas')
      return true
    } catch {
      await refreshStatus()
      toast.error(
        'No pudimos desactivar las notificaciones',
        'Intent\u00e1 nuevamente para completar la operaci\u00f3n.',
      )
      return false
    } finally {
      setIsLoading(false)
    }
  }, [refreshStatus, removeSubscription, toast])

  return {
    activate,
    deactivate,
    isLoading,
    refreshStatus,
    status,
    syncExistingSubscription,
  }
}
