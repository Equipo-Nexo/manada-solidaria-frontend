import { createContext, type ReactNode } from 'react'

export type ToastInput = {
  title: string
  description?: string
  time?: number
}

export type ToastApi = {
  success: (toast: string | ToastInput, description?: string, time?: number) => void
  error: (toast: string | ToastInput, description?: string, time?: number) => void
  information: (toast: string | ToastInput, description?: string, time?: number) => void
}

export type ToastProviderProps = {
  children: ReactNode
}

export const ToastContext = createContext<ToastApi | null>(null)
