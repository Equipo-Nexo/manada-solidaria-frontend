import styled, { css } from 'styled-components'

export const SessionPage = styled.main`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px 16px;
  background: ${({ theme }) => theme.colors.neutral};
`

export const ErrorPanel = styled.section`
  width: min(100%, 420px);
  padding: 28px 24px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 18px 45px rgb(89 65 55 / 13%);
  text-align: center;
`

export const ErrorTitle = styled.h1`
  color: ${({ theme }) => theme.colors.darkColor};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
`

export const ErrorDescription = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`

export const ErrorActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`

const buttonStyles = css`
  width: 100%;
  min-height: 48px;
  padding: 12px 18px;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.typography.action.fontFamily};
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  line-height: ${({ theme }) => theme.typography.action.lineHeight};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`

export const PrimaryButton = styled.button`
  ${buttonStyles}
  border: 2px solid ${({ theme }) => theme.colors.brand};
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};
`

export const SecondaryButton = styled.button`
  ${buttonStyles}
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};
`
