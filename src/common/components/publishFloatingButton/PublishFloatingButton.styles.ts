import styled from 'styled-components'

export const FloatingButton = styled.button<{ $showText?: boolean }>`
  position: fixed;
  right: 24px;
  bottom: 96px;
  z-index: 30;
  min-width: 78px;
  min-height: 78px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: ${props => props.$showText ? '0 20px' : '0px'};
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral};
  box-shadow: 0 12px 24px rgb(89 65 55 / 22%);
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.floatingAction.fontSize};
  font-weight: ${({ theme }) => theme.typography.floatingAction.fontWeight};
  line-height: ${({ theme }) => theme.typography.floatingAction.lineHeight};
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 16px 30px rgb(89 65 55 / 28%);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  svg {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
  }
`
