import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'react-redux'
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
import { runPushSubscriptionOperation } from '@common/services/pushNotifications/subscriptionSync'
import { useToast } from '@hooks/toast/useToast'
import useAuth from '@hooks/auth/useAuth'
import type { RootState } from '@store/store'

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY?.trim() ?? ''

export function usePushNotifications() {
  const toast = useToast()
  const store = useStore<RootState>()
  const { userId } = useAuth()
  const [browserStatus, setBrowserStatus] = useState<PushNotificationStatus>('permission-default')
  const [isLoading, setIsLoading] = useState(true)
  const [registerSubscription, registration] = useRegisterPushSubscriptionMutation({
    fixedCacheKey: `push-subscription:${userId}`,
  })
  const [removeSubscription, removal] = useRemovePushSubscriptionMutation()

  const status = browserStatus === 'subscribed' && !registration.isSuccess
    ? 'sync-pending'
    : browserStatus

  const isCurrentUser = useCallback(() => {
    const auth = store.getState().auth
    return auth.isAuthenticated && auth.userId === userId
  }, [store, userId])

  const refreshStatus = useCallback(async () => {
    setIsLoading(true)
    try {
      const nextStatus = await getPushNotificationStatus()
      setBrowserStatus(nextStatus)
      return nextStatus
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void getPushNotificationStatus()
      .then(setBrowserStatus)
      .catch(() => setBrowserStatus(isPushSupported() ? 'not-subscribed' : 'unsupported'))
      .finally(() => setIsLoading(false))
  }, [])

  const syncExistingSubscription = useCallback((signal: AbortSignal): Promise<boolean> => {
    return runPushSubscriptionOperation(async () => {
      if (!isCurrentUser() || signal.aborted) return false

      const localStatus = await getPushNotificationStatus()
      if (!isCurrentUser() || signal.aborted) return false
      setBrowserStatus(localStatus)
      if (localStatus !== 'subscribed') return false

      const subscription = await getCurrentSubscription()
      if (!subscription || !isCurrentUser() || signal.aborted) return false

      // El servidor puede haber perdido el registro aunque siga existiendo en
      // el navegador. Reenviamos la misma suscripción para recuperarlo.
      await registerSubscription(toPushSubscriptionRequest(subscription)).unwrap()
      return true
    })
  }, [isCurrentUser, registerSubscription])

  const activate = useCallback(async (): Promise<PushActivationResult> => {
    if (!isPushSupported()) {
      setBrowserStatus('unsupported')
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
        setBrowserStatus('permission-denied')
        toast.error(
          'Notificaciones bloqueadas',
          'Activ\u00e1 el permiso desde la configuraci\u00f3n del navegador para recibir avisos.',
        )
        return 'permission-denied'
      }

      if (permission !== 'granted') {
        setBrowserStatus('permission-default')
        return 'permission-default'
      }

      await runPushSubscriptionOperation(async () => {
        if (!isCurrentUser()) throw new Error('La sesión cambió')
        const subscription = await subscribeToPushNotifications(VAPID_PUBLIC_KEY)
        if (!isCurrentUser()) throw new Error('La sesión cambió')
        await registerSubscription(toPushSubscriptionRequest(subscription)).unwrap()
      })
      setBrowserStatus('subscribed')
      toast.success(
        'Notificaciones activadas',
        'Vas a recibir avisos importantes aunque la aplicaci\u00f3n est\u00e9 cerrada.',
      )
      return 'subscribed'
    } catch {
      const localStatus = await refreshStatus()
      toast.error(
        'No pudimos activar las notificaciones',
        'La suscripci\u00f3n local se conservar\u00e1 para volver a intentarlo.',
      )
      return localStatus === 'subscribed' ? 'sync-pending' : localStatus
    } finally {
      setIsLoading(false)
    }
  }, [isCurrentUser, refreshStatus, registerSubscription, toast])

  const deactivate = useCallback(async (): Promise<boolean> => {
    setIsLoading(true)
    try {
      await runPushSubscriptionOperation(async () => {
        if (!isCurrentUser()) throw new Error('La sesión cambió')
        const subscription = await getCurrentSubscription()
        if (!isCurrentUser()) throw new Error('La sesión cambió')

        if (subscription) {
          await removeSubscription({ endpoint: subscription.endpoint }).unwrap()
          const unsubscribed = await unsubscribeFromPushNotifications(subscription)
          if (!unsubscribed && await getCurrentSubscription()) {
            throw new Error('No se pudo eliminar la suscripción local')
          }
        }
      })

      registration.reset()
      setBrowserStatus('not-subscribed')
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
  }, [isCurrentUser, refreshStatus, registration, removeSubscription, toast])

  return {
    activate,
    deactivate,
    isLoading: isLoading || registration.isLoading || removal.isLoading,
    refreshStatus,
    status,
    syncExistingSubscription,
  }
}
