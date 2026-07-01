import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Toaster, { type ToastNotification, type ToastType } from '../components/toaster/Toaster'

type ToastInput = {
  title: string
  description?: string
  time?: number
}

type ToastApi = {
  success: (toast: string | ToastInput, description?: string, time?: number) => void
  error: (toast: string | ToastInput, description?: string, time?: number) => void
  information: (toast: string | ToastInput, description?: string, time?: number) => void
}

type ToastProviderProps = {
  children: ReactNode
}

const DEFAULT_TOAST_TIME = 2000
const ToastContext = createContext<ToastApi | null>(null)

function createToast(
  type: ToastType,
  toast: string | ToastInput,
  description?: string,
  time?: number,
): ToastNotification {
  const content = typeof toast === 'string' ? { title: toast, description, time } : toast

  return {
    id: crypto.randomUUID(),
    type,
    ...content,
  }
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [notification, setNotification] = useState<ToastNotification | null>(null)

  const showToast = useCallback(
    (type: ToastType, toast: string | ToastInput, description?: string, time?: number) => {
      setNotification(createToast(type, toast, description, time))
    },
    [],
  )

  const toast = useMemo(
    () => ({
      success: (toastInput: string | ToastInput, description?: string, time?: number) => {
        showToast('success', toastInput, description, time)
      },
      error: (toastInput: string | ToastInput, description?: string, time?: number) => {
        showToast('error', toastInput, description, time)
      },
      information: (toastInput: string | ToastInput, description?: string, time?: number) => {
        showToast('information', toastInput, description, time)
      },
    }),
    [showToast],
  )

  useEffect(() => {
    if (!notification) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setNotification((currentNotification) =>
        currentNotification?.id === notification.id ? null : currentNotification,
      )
    }, notification.time ?? DEFAULT_TOAST_TIME)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [notification])

  return (
    <ToastContext value={toast}>
      {children}
      <Toaster notification={notification} />
    </ToastContext>
  )
}

export function useToast() {
  const toast = useContext(ToastContext)

  if (!toast) {
    throw new Error('useToast debe usarse dentro de ToastProvider')
  }

  return toast
}
