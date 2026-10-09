import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRemovePushSubscriptionMutation } from '@app/services/apis/pushNotificationsApi'
import { getCurrentSubscription } from '@common/services/pushNotifications/pushNotifications'
import { logout } from '@store/authSlice'
import { useAppDispatch } from '@store/hooks'
import { useToast } from '@hooks/toast/useToast'

export function useLogout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const [removeSubscription, { isLoading }] = useRemovePushSubscriptionMutation()

  const performLogout = useCallback(async (): Promise<boolean> => {
    try {
      const subscription = await getCurrentSubscription()

      if (subscription) {
        await removeSubscription({ endpoint: subscription.endpoint }).unwrap()
      }
    } catch {
      toast.error(
        'No pudimos cerrar tu sesi\u00f3n',
        'No se pudo desvincular este dispositivo. Revis\u00e1 tu conexi\u00f3n e intent\u00e1 nuevamente.',
      )
      return false
    }

    dispatch(logout())
    navigate('/login', { replace: true })
    return true
  }, [dispatch, navigate, removeSubscription, toast])

  return { isLoggingOut: isLoading, performLogout }
}
