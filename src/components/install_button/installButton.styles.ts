import styled from 'styled-components'

export const InstallPromptButton = styled.button<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 9rem;
  left: 50%;
  z-index: 50;
  padding: 0.75rem 3.75rem;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 10px 15px rgb(0 0 0 / 18%);
  cursor: pointer;
  font-weight: 500;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translate(-50%, 0)' : 'translate(-50%, 6rem)'};
  transition: opacity 500ms ease-out, transform 500ms ease-out;
`
