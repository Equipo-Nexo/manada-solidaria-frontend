import { Check, CircleX, Info } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

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

const toastEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const toastAccentByType = {
  success: '#A95C28',
  error: '#E76F51',
  information: '#594137',
}

const ToastRegion = styled.div`
  position: fixed;
  top: 14px;
  left: 50%;
  z-index: 40;
  width: min(calc(100% - 28px), 410px);
  pointer-events: none;
  transform: translateX(-50%);

  @media (max-width: 420px) {
    top: 12px;
    width: calc(100% - 24px);
  }
`

const ToastCard = styled.section<{ $type: ToastType }>`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  min-height: 76px;
  padding: 14px 18px;
  border: 1px solid rgb(169 92 40 / 22%);
  border-left: 5px solid ${({ $type }) => toastAccentByType[$type]};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 12px 24px rgb(89 65 55 / 18%);
  text-align: left;
  animation: ${toastEnter} 180ms ease-out;

  @media (max-width: 420px) {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 12px;
    min-height: 72px;
    padding: 12px 14px;
  }
`

const ToastIcon = styled.div<{ $type: ToastType }>`
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ $type }) => toastAccentByType[$type]};
  color: #fff;
  box-shadow: 0 8px 18px rgb(169 92 40 / 20%);

  svg {
    width: 25px;
    height: 25px;
    stroke-width: 2.4;
  }

  @media (max-width: 420px) {
    width: 44px;
    height: 44px;
  }
`

const ToastContent = styled.div`
  min-width: 0;
`

const ToastTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 800;
  line-height: 21px;
`

const ToastDescription = styled.p`
  margin: 3px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
`

export default Toaster
