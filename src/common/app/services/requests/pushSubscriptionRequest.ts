export interface PushSubscriptionRequest {
  endpoint: string
  expirationTime?: number | null
  key: {
    p256dh: string
    auth: string
  }
}

export interface RemovePushSubscriptionRequest {
  endpoint: string
}
