import styled from 'styled-components'

export const LoginPanel = styled.section`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral};
  padding: max(0px, env(safe-area-inset-top)) 16px max(0px, env(safe-area-inset-bottom));
  overflow-y: auto;
`

export const LoginContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 32px;
  height: 85dvh;
  width: min(100%, 400px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 24px;
  gap: 5px;

  @media(min-width: 361px) {
    gap: 16px;
    padding-top: 12px;
  }

`

export const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  justify-content: center;
  
  @media(min-width: 361px) {
    gap: 12px;
  }
`

export const HeaderTextContainer = styled.div`
`

export const FooterContainer = styled.div`
  flex: 0 0 auto;
  min-height: 5dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`

export const FooterText = styled.p`
  font-size: 10px;

  @media(min-width: 361px) {
    font-size: 12px;
  }

`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;

  @media(min-width: 361px) {
    gap: 8px;
    margin-top: 12px;
  }
`;

export const TitleLineBreak = styled.br`
`

export const AppLogo = styled.img`
  width: 6rem;
  height: auto;

  @media(min-width: 361px) {
    width: 8rem;
  }
`;

export const AppTitle = styled.h1`
  color: ${({ theme }) => theme.colors.brand};
  font-size: 1.2rem;
  
  @media(min-width: 361px) {
    font-size: 1.5rem;
  }
`

export const AppDescription = styled.p`
  font-size: 0.8rem;
  
  @media(min-width: 361px) {
    font-size: 1rem;
  }
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
  color: ${({theme}) => theme.colors.black};
`

export const WelcomeSubtitle = styled.p`
  font-size: ${({theme}) => theme.fontSizes.normal};
  font-weight: ${({theme}) => theme.fontWeights.regular};
  color: ${({theme}) => theme.colors.black};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  width: 100%;
  margin-top: 1rem;
`
export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 6px;
`

export const FieldLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`

export const FieldLabel = styled.label`
  color: ${({ theme }) => theme.colors.darkColor};
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.14px;

  @media (min-width: 768px) and (max-height: 720px) {
    line-height: 18px;
  }
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
  margin-top: 6px;

  @media(min-width: 361px) {
    margin-top: 12px;
  }

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
  height: 2.5rem;
  border-radius: 9999px;
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10);
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  @media(min-width: 361px) {
    height: 3rem;
    font-size: 1rem;
  }
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
  margin-bottom: 1rem;
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
