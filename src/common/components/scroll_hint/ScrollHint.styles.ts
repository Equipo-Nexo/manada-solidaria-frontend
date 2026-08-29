import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  0%, 100% { transform: rotate(90deg) translateX(0); }
  50% { transform: rotate(90deg) translateX(4px); }
`

export const Hint = styled.button`
  position: fixed;
  z-index: 20;
  right: 50%;
  bottom: 88px;
  display: none;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 999px;
  background: rgb(255 255 255 / 94%);
  box-shadow: 0 6px 20px rgb(89 65 55 / 20%);
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transform: translateX(50%);
  backdrop-filter: blur(6px);

  svg {
    width: 8px;
    height: 12px;
    color: ${({ theme }) => theme.colors.brand};
    animation: ${bounce} 1.4s ease-in-out infinite;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    display: inline-flex;
    bottom: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      animation: none;
      transform: rotate(90deg);
    }
  }
`
