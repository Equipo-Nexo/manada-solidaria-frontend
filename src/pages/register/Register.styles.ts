import { Link } from 'react-router-dom'
import styled from 'styled-components'

const formWidth = '284px'

export const RegisterPanel = styled.section`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.neutral};
  padding: 48px 16px;
`

export const RegisterContainer = styled.div`
  position: relative;
  width: min(100%, 430px);
  min-height: calc(100dvh - 96px);
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    width: min(100%, 380px);
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 8px;
    background: linear-gradient(90deg, #ea5f09 0%, #cbb6ff 50%, #a95c28 100%);
  }
`

export const RegisterContent = styled.div`
  width: 100%;
  min-height: calc(100dvh - 96px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 24px 32px;
  text-align: center;

  @media (max-width: 360px) {
    padding-right: 18px;
    padding-left: 18px;
  }
`

export const AppLogo = styled.img`
  width: 112px;
  height: 105px;
  flex: 0 0 auto;
  display: block;
  object-fit: contain;
`

export const RegisterTitle = styled.h1`
  margin: 4px 0 0;
  color: #261813;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
`

export const RegisterSubtitle = styled.p`
  width: min(100%, ${formWidth});
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
  margin-top: 24px;
`

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  text-align: left;
`

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;
`

export const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.brand};
`

export const Input = styled.input<{ $hasError?: boolean }>`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 15px 24px;
  border: 2px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.error : '#f7ddd3')};
  border-radius: 8px;
  background: #fdf8f4;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.brand)};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
  }
`

export const FieldError = styled.p`
  margin: -2px 0 0;
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;

  ${Input} {
    padding-right: 52px;
  }
`

export const PasswordToggle = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    color: ${({ theme }) => theme.colors.brand};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.25;
  }
`

export const SwitchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border: 1px solid #f7ddd3;
  border-radius: 12px;
  background: #fff1ec;
  text-align: left;
`

export const SwitchRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`

export const SwitchLabelContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    stroke-width: 2;
  }
`

export const SwitchInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
`

export const SwitchControl = styled.span`
  position: relative;
  width: 48px;
  height: 28px;
  flex: 0 0 48px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.stroke};
  transition: background 160ms ease;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0 2px 4px rgb(89 65 55 / 22%);
    transition: transform 160ms ease;
  }

  ${SwitchInput}:checked + & {
    background: ${({ theme }) => theme.colors.brand};
  }

  ${SwitchInput}:checked + &::after {
    transform: translateX(20px);
  }

  ${SwitchInput}:focus-visible + & {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const HelpText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`

export const PrimaryButton = styled.button`
  width: 100%;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 24px;
  border: 0;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  transition: background 160ms ease, transform 160ms ease;

  svg {
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    stroke-width: 2.5;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.72;
    transform: none;
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const LoginText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
`

export const LoginLink = styled(Link)`
  color: #9f3d00;
  font-weight: 400;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const RegisterFooter = styled.p`
  width: min(100%, 430px);
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  text-align: center;

  @media (min-width: 768px) {
    width: min(100%, 380px);
  }
`
