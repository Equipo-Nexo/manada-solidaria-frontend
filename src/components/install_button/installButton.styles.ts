import styled from 'styled-components'

export const InstallPromptButton = styled.button<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 12.25rem;
  left: 50%;
  z-index: 50;
  min-height: 36px;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 10px 15px rgb(0 0 0 / 18%);
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 18px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 1.5rem)'};
  transition: opacity 500ms ease-out, transform 500ms ease-out, box-shadow 160ms ease;
  white-space: nowrap;

  &:hover {
    box-shadow: 0 12px 22px rgb(89 65 55 / 22%);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    bottom: 11rem;
  }
`
