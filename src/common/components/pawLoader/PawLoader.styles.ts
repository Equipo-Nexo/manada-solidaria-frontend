import styled, { keyframes } from 'styled-components'
import type { PawLoaderSize } from './PawLoader'

const pawSize: Record<PawLoaderSize, string> = {
  small: '18px',
  medium: '26px',
  large: '34px',
}

const step = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: translateY(3px) scale(0.85);
  }

  35% {
    opacity: 1;
    transform: translateY(-3px) scale(1);
  }
`

export const Loader = styled.div<{ $size: PawLoaderSize }>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};

  svg {
    width: ${({ $size }) => pawSize[$size]};
    height: ${({ $size }) => pawSize[$size]};
  }
`

export const PawTrail = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

export const Paw = styled.span`
  display: inline-flex;
  animation: ${step} 1.2s ease-in-out infinite;
  color: ${({ theme }) => theme.colors.brand};

  &:nth-child(2) {
    animation-delay: 0.18s;
    color: ${({ theme }) => theme.colors.tertiary};
  }

  &:nth-child(3) {
    animation-delay: 0.36s;
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`

export const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`
