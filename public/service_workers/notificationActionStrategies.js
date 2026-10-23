importScripts(
  '/service_workers/notification_actions/redirect.js',
  '/service_workers/notification_actions/close.js',
)

// Registrar aqu? cada nuevo tipo de acci?n y su estrategia.
const notificationActionStrategies = new Map([
  ['CLOSE', closeNotificationAction],
  ['REDIRECT', redirectNotificationAction],
])
