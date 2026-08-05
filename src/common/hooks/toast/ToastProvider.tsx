import { useCallback, useEffect, useMemo, useState } from 'react'
import Toaster, { type ToastNotification, type ToastType } from '@components/toaster/Toaster'
import { ToastContext, type ToastInput, type ToastProviderProps } from './toastContext'
import { subscribeToToastEvents } from './toastEvents'

const DEFAULT_TOAST_TIME = 2000

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
    return subscribeToToastEvents(({ type, toast: toastInput }) => {
      showToast(type, toastInput)
    })
  }, [showToast])

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
