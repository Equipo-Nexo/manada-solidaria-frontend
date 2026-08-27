import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: calc(100dvh - 190px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PasskeyButton = styled.button`
  width: min(100%, 284px);
  height: 56px;
  padding: 0 24px;
  border: 0;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    transform: none;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`
