import styled from 'styled-components'

export const LoginPanel = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral};
  padding: 0px 16px;
`

export const LoginContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 32px;
  height: min(90%, 900px);
  width: min(100%, 500px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const FooterContainer = styled.div`
  height: max(5%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FooterText = styled.p`

`


export const AppLogo = styled.img`
  margin-top: 2rem;
  width: 10rem;
  height: auto;
`;

export const AppTitle = styled.h1`
  color: ${({ theme }) => theme.colors.brand};
  font-size: ${({ theme }) => theme.fontSizes.title};
  margin-top: 1rem;
`

export const AppDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  margin-top: 5px;
`

export const TitlesContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1px;
`

export const WelcomeTitle = styled.h2`
  font-size: ${({theme}) => theme.fontSizes.subtitle};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  color: ${({theme}) => theme.colors.black}
`

export const WelcomeSubtitle = styled.p`
  font-size: ${({theme}) => theme.fontSizes.normal};
  font-weight: ${({theme}) => theme.fontWeights.regular};
  color: ${({theme}) => theme.colors.black}
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  width: 100%;
  margin-top: 1rem;

  @media (min-width: 768px) {
    padding: 0 3rem;
  }

  @media (min-width: 1024px) {
    padding: 0 5rem;
  }
`
export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 4px;
`

export const FieldLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.darkColor };
  font-size: ${({ theme }) => theme.fontSizes.normal };
  font-weight: ${({ theme }) => theme.fontWeights.semibold };
`

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${({theme}) => theme.colors.soft};
  border: none;
  border-radius: 12px;
`

export const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;

  ${Input} {
    padding-right: 52px;
  }

  @media (max-width: 767px) {
    ${Input} {
      padding-right: 44px;
    }
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

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.colors.brand};
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.brand};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.25;
  }

  @media (max-width: 767px) {
    right: 12px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`

export const RecoveryButton = styled.button`
  align-self: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.regular}
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: ${({ theme }) => theme.fontSizes.normal};
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 2px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.colors.brand};
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.brand};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 9999px;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10);
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold}
`

export const LoginDivider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 12px;
  line-height: 5px;

  @media (max-width: 767px) {
    gap: 8px;
    font-size: 10px;
    line-height: 14px;
  }

  &::before,
  &::after {
    content: '';
    height: 1px;
    flex: 1;
    background: ${({ theme }) => theme.colors.stroke};
  }
`

export const PasskeyButton = styled(LoginButton)`
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral};
  }
`

export const RegisterTextContainer = styled.div`
  margin-top: 1rem;
`

export const RegisterText = styled.p`
  color: ${({ theme }) => theme.colors.darkColor};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.normal};
`

export const RegisterLink = styled.a`
  color: ${({ theme }) => theme.colors.brand};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.normal};
`
