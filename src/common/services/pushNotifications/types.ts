export type PushNotificationStatus =
  | 'unsupported'
  | 'permission-default'
  | 'permission-denied'
  | 'subscribed'
  | 'sync-pending'
  | 'not-subscribed'

export type PushActivationResult = PushNotificationStatus | 'configuration-error'
