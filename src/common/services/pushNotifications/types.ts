export type PushNotificationStatus =
  | 'unsupported'
  | 'permission-default'
  | 'permission-denied'
  | 'subscribed'
  | 'not-subscribed'

export type PushActivationResult = PushNotificationStatus | 'configuration-error'
