import styled from 'styled-components'

const formWidth = '284px'

export const LoginPanel = styled.section`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  background: ${({ theme }) => theme.colors.neutral};
  padding: 16px 16px 6px;

  @media (max-height: 760px) {
    padding-top: 10px;
    padding-bottom: 4px;
  }

  @media (max-width: 767px) {
    padding-top: 10px;
    padding-bottom: 4px;
  }
`

export const LoginFooter = styled.p`
  width: min(100%, 430px);
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
`

export const LoginContainer = styled.div`
  position: relative;
  width: min(100%, 430px);
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  border-radius: 32px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 360px) {
    min-height: 0;
  }

  @media (max-height: 760px) {
    min-height: 0;
  }

  @media (max-width: 767px) {
    min-height: 0;
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

export const LoginContent = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 24px 43px;
  text-align: center;

  @media (max-height: 760px) {
    min-height: 0;
    padding: 18px 24px 22px;
  }

  @media (max-height: 620px) {
    padding-top: 12px;
    padding-bottom: 18px;
  }

  @media (max-width: 767px) {
    min-height: 0;
    padding-bottom: 24px;
  }
`

export const AppLogo = styled.img`
  width: 160px;
  height: 150px;
  flex: 0 0 150px;
  display: block;
  object-fit: contain;

  @media (max-height: 760px) {
    width: 112px;
    height: 105px;
    flex-basis: 105px;
  }

  @media (max-height: 620px) {
    width: 88px;
    height: 82px;
    flex-basis: 82px;
  }
`

export const AppTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.brand};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  text-align: center;

  @media (max-height: 760px) {
    font-size: 28px;
    line-height: 34px;
  }

  @media (max-height: 620px) {
    font-size: 24px;
    line-height: 28px;
  }
`

export const AppDescription = styled.p`
  width: min(100%, ${formWidth});
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;

  @media (max-height: 760px) {
    font-size: 15px;
    line-height: 22px;
  }
`

export const Form = styled.form`
  width: min(100%, ${formWidth});
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 31px;
  margin-top: 31px;

  @media (max-height: 760px) {
    gap: 16px;
    margin-top: 16px;
  }

  @media (max-height: 620px) {
    gap: 12px;
    margin-top: 12px;
  }
`

export const FormFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 18px;

  @media (max-height: 760px) {
    gap: 12px;
  }

  @media (max-height: 620px) {
    gap: 10px;
  }
`

export const WelcomeTitle = styled.h2`
  margin: 0;
  color: #261813;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  text-align: center;

  @media (max-height: 760px) {
    font-size: 22px;
    line-height: 30px;
  }

  @media (max-height: 620px) {
    font-size: 20px;
    line-height: 26px;
  }
`

export const WelcomeSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;

  @media (max-height: 760px) {
    font-size: 15px;
    line-height: 22px;
  }
`

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  text-align: left;

  @media (max-height: 760px) {
    gap: 6px;
  }
`

export const FieldHeader = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #594137;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;

  @media (max-height: 620px) {
    line-height: 18px;
  }

  svg {
    width: 15px;
    height: 15px;
    flex: 0 0 15px;
    stroke-width: 2.25;
  }
`

export const Input = styled.input`
  display: flex;
  width: 100%;
  height: 56px;
  padding: 16.5px 24px;
  align-self: stretch;
  align-items: flex-start;
  justify-content: center;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 12px;
  background: #fff1ec;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  outline: none;

  @media (max-height: 760px) {
    height: 48px;
    padding-top: 13.5px;
    padding-bottom: 13.5px;
  }

  @media (max-height: 620px) {
    height: 44px;
    padding-top: 11.5px;
    padding-bottom: 11.5px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.brand};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
  }
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

export const RecoveryButton = styled.button`
  align-self: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.darkColor};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 2px;

  @media (max-height: 760px) {
    line-height: 18px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.brand};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const PrimaryButton = styled.button`
  width: ${formWidth};
  max-width: 100%;
  height: 56px;
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

  @media (max-height: 760px) {
    height: 48px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const RegisterText = styled.p`
  margin: 24px 0 0;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  text-align: center;

  @media (max-height: 760px) {
    margin-top: 14px;
  }
`

export const RegisterLink = styled.a`
  color: ${({ theme }) => theme.colors.brand};
  font-weight: 400;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`
