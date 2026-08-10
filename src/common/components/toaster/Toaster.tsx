import { Check, CircleX, Info } from '../../icons'
import {
  ToastCard,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastRegion,
  ToastTitle,
} from './Toaster.styles'

export type ToastType = 'success' | 'error' | 'information'

export type ToastNotification = {
  id: string
  type: ToastType
  title: string
  description?: string
  time?: number
}

type ToasterProps = {
  notification: ToastNotification | null
}

const toastIcons = {
  success: Check,
  error: CircleX,
  information: Info,
}

function Toaster({ notification }: ToasterProps) {
  if (!notification) {
    return null
  }

  const Icon = toastIcons[notification.type]
  const role = notification.type === 'error' ? 'alert' : 'status'

  return (
    <ToastRegion aria-live={notification.type === 'error' ? 'assertive' : 'polite'}>
      <ToastCard $type={notification.type} role={role}>
        <ToastIcon $type={notification.type} aria-hidden="true">
          <Icon />
        </ToastIcon>
        <ToastContent>
          <ToastTitle>{notification.title}</ToastTitle>
          {notification.description && <ToastDescription>{notification.description}</ToastDescription>}
        </ToastContent>
      </ToastCard>
    </ToastRegion>
  )
}

export default Toaster
