import type { PushSubscriptionRequest } from '@app/services/requests/pushSubscriptionRequest'
import type { PushNotificationStatus } from './types'
import { urlBase64ToUint8Array } from './vapid'

export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  )
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  return isPushSupported() ? Notification.permission : 'unsupported'
}

async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration> {
  if (!isPushSupported()) {
    throw new Error('Web Push no est\u00e1 soportado en este navegador')
  }

  return navigator.serviceWorker.ready
}

export async function getCurrentSubscription(): Promise<PushSubscription | null> {
  if (!isPushSupported()) return null

  const registration = await getServiceWorkerRegistration()
  return registration.pushManager.getSubscription()
}

export async function getPushNotificationStatus(): Promise<PushNotificationStatus> {
  const permission = getNotificationPermission()

  if (permission === 'unsupported') return 'unsupported'
  if (permission === 'default') return 'permission-default'
  if (permission === 'denied') return 'permission-denied'

  return (await getCurrentSubscription()) ? 'subscribed' : 'not-subscribed'
}

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isPushSupported()) {
    throw new Error('Web Push no est\u00e1 soportado en este navegador')
  }

  return Notification.requestPermission()
}

export async function subscribeToPushNotifications(
  vapidPublicKey: string,
): Promise<PushSubscription> {
  const registration = await getServiceWorkerRegistration()
  const existingSubscription = await registration.pushManager.getSubscription()

  if (existingSubscription) return existingSubscription

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  })
}

export async function unsubscribeFromPushNotifications(
  subscription: PushSubscription,
): Promise<boolean> {
  return subscription.unsubscribe()
}

export function toPushSubscriptionRequest(
  subscription: PushSubscription,
): PushSubscriptionRequest {
  const serializedSubscription = subscription.toJSON()
  const p256dh = serializedSubscription.keys?.p256dh
  const auth = serializedSubscription.keys?.auth

  if (!serializedSubscription.endpoint || !p256dh || !auth) {
    throw new Error('La suscripci\u00f3n push no contiene las claves requeridas')
  }

  return {
    endpoint: serializedSubscription.endpoint,
    expirationTime: serializedSubscription.expirationTime ?? null,
    key: { p256dh, auth },
  }
}
