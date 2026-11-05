import { redirectNotificationAction } from './notification_actions/redirect.js'
import { closeNotificationAction } from './notification_actions/close.js'
import { requestNotificationAction } from './notification_actions/request.js'

export const notificationActionStrategies = new Map([
  ['CLOSE', closeNotificationAction],
  ['REDIRECT', redirectNotificationAction],
  ['REQUEST', requestNotificationAction]
])
