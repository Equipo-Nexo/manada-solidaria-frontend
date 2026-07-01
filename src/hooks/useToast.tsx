import { useContext } from 'react'
import { ToastContext } from './toastContext'

export function useToast() {
  const toast = useContext(ToastContext)

  if (!toast) {
    throw new Error('useToast debe usarse dentro de ToastProvider')
  }

  return toast
}
