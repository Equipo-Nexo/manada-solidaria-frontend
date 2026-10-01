import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as Recovery from '../password_recovery_request/PasswordRecoveryEmail.styles'

export const Page = Recovery.Page
export const Panel = Recovery.Panel
export const Footer = Recovery.Footer
export const Title = styled(Recovery.Title)`
  margin-top: 24px;
`
export const Description = Recovery.Description

export const Content = styled.div`
  width: min(100%, 284px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SuccessIcon = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.neutral};

  svg {
    width: 60px;
    height: 60px;
  }

  @media (max-height: 650px) {
    width: 80px;
    height: 80px;

    svg {
      width: 48px;
      height: 48px;
    }
  }
`

export const Message = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const LoginLink = styled(Link)`
  width: 100%;
  min-height: 48px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 20px;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);

  &:hover {
    background: ${({ theme }) => theme.colors.brandHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    min-height: 40px;
    font-size: 0.875rem;
  }

  @media (max-height: 650px) {
    margin-top: 20px;
  }
`
