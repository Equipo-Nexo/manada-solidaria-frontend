import { useEffect } from 'react'
import useAuth from '@hooks/auth/useAuth'
import { startPushSubscriptionSync } from '@common/services/pushNotifications/subscriptionSync'
import { usePushNotifications } from './usePushNotifications'

export function usePushSubscriptionSync() {
  const { isAuthenticated } = useAuth()
  const { syncExistingSubscription } = usePushNotifications()

  useEffect(() => {
    if (!isAuthenticated) return

    return startPushSubscriptionSync(syncExistingSubscription)
  }, [isAuthenticated, syncExistingSubscription])
}
