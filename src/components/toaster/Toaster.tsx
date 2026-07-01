import { Check, CircleX, Info } from 'lucide-react'
import './Toaster.css'

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
    <div className="toaster" aria-live={notification.type === 'error' ? 'assertive' : 'polite'}>
      <section className={`toaster__toast toaster__toast--${notification.type}`} role={role}>
        <div className="toaster__icon" aria-hidden="true">
          <Icon />
        </div>
        <div className="toaster__content">
          <h2 className="toaster__title">{notification.title}</h2>
          {notification.description && <p className="toaster__description">{notification.description}</p>}
        </div>
      </section>
    </div>
  )
}

export default Toaster
