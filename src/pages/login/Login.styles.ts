import styled from 'styled-components'

export const LoginPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  color: ${({ theme }) => theme.colors.darkColor};
`

export const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.display.fontSize};
  font-weight: ${({ theme }) => theme.typography.display.fontWeight};
  line-height: ${({ theme }) => theme.typography.display.lineHeight};
`

export const PrimaryButton = styled.button`
  min-height: 44px;
  padding: 10px 22px;
  border: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`
