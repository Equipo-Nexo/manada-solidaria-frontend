import styled, { keyframes } from 'styled-components'
import type { ToastType } from './Toaster'

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

export const ToastRegion = styled.div`
  position: fixed;
  top: 14px;
  left: 50%;
  z-index: 100;
  width: min(calc(100% - 28px), 410px);
  pointer-events: none;
  transform: translateX(-50%);

  @media (max-width: 420px) {
    top: 12px;
    width: calc(100% - 24px);
  }
`

export const ToastCard = styled.section<{ $type: ToastType }>`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  min-height: 76px;
  padding: 14px 18px;
  border: 1px solid rgb(169 92 40 / 22%);
  border-left: 5px solid ${({ $type, theme }) => theme.colors.toast[$type]};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.darkColor};
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

export const ToastIcon = styled.div<{ $type: ToastType }>`
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ $type, theme }) => theme.colors.toast[$type]};
  color: ${({ theme }) => theme.colors.background};
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

export const ToastContent = styled.div`
  min-width: 0;
`

export const ToastTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.toastTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.toastTitle.fontWeight};
  line-height: ${({ theme }) => theme.typography.toastTitle.lineHeight};
`

export const ToastDescription = styled.p`
  margin: 3px 0 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.toastDescription.fontSize};
  font-weight: ${({ theme }) => theme.typography.toastDescription.fontWeight};
  line-height: ${({ theme }) => theme.typography.toastDescription.lineHeight};
`
