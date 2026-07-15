import type { ToastInput } from './toastContext'

const TOAST_EVENT_NAME = 'manada-solidaria:toast'

export type ToastEventDetail = {
  type: 'success' | 'error' | 'information'
  toast: ToastInput
}

export function dispatchToast(detail: ToastEventDetail) {
  window.dispatchEvent(new CustomEvent<ToastEventDetail>(TOAST_EVENT_NAME, { detail }))
}

export function subscribeToToastEvents(listener: (detail: ToastEventDetail) => void) {
  const handleToast = (event: Event) => {
    listener((event as CustomEvent<ToastEventDetail>).detail)
  }

  window.addEventListener(TOAST_EVENT_NAME, handleToast)

  return () => {
    window.removeEventListener(TOAST_EVENT_NAME, handleToast)
  }
}
