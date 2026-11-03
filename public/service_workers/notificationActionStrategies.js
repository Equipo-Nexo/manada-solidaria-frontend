importScripts(
  '/service_workers/notification_actions/redirect.js',
  '/service_workers/notification_actions/close.js',
)

const notificationActionStrategies = new Map([
  ['CLOSE', closeNotificationAction],
  ['REDIRECT', redirectNotificationAction],
])
