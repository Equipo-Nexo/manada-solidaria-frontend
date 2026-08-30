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

  @media (max-width: 767px) and (max-height: 750px) {
    justify-content: flex-start;
    padding-top: max(8px, env(safe-area-inset-top));
  }

  @media (max-width: 767px) and (max-height: 650px) {
    padding-top: max(4px, env(safe-area-inset-top));
  }
`

export const LoginContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 32px;
  min-height: min(90dvh, 900px);
  width: min(100%, 500px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

export const FooterContainer = styled.div`
  flex: 0 0 auto;
  min-height: 5dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) and (max-height: 750px) {
    min-height: 32px;
  }

  @media (max-width: 767px) and (max-height: 670px) {
    min-height: 28px;
  }
`

export const FooterText = styled.p`
  @media (max-width: 767px) and (max-height: 650px) {
    font-size: 0.625rem;
    line-height: 1.2;
  }
`

export const TitleLineBreak = styled.br`
  @media (max-width: 1300px) and (max-height: 720px) {
    display: none;
  }
`

export const AppLogo = styled.img`
  margin-top: 2rem;
  width: 10rem;
  height: auto;

  @media (max-width: 1300px) and (max-height: 720px) {
    width: 8rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 850px) {
    width: 8rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    width: 6rem;
    margin-top: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    width: 4.5rem;
    margin-top: 0.5rem;
  }
`;

export const AppTitle = styled.h1`
  color: ${({ theme }) => theme.colors.brand};
  font-size: ${({ theme }) => theme.fontSizes.title};
  margin-top: 1rem;

  @media (max-width: 1300px) and (max-height: 720px) {
   
  }

  @media (max-width: 767px) and (max-height: 850px) {
    margin-top: 0.375rem;
    font-size: 1.7rem;
    line-height: 1.1;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    margin-top: 0.375rem;
    font-size: 1.5rem;
    line-height: 1.1;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    display: none;
  }
`

export const AppDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.normal};
  margin-top: 5px;

  @media (max-width: 767px) and (max-height: 750px) {
    margin-top: 2px;
    font-size: 0.875rem;
    line-height: 1.2;
  }

  @media (max-width: 767px) and (max-height: 670px) {
    display: none;
  }
`

export const TitlesContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1px;
  @media (max-width: 1300px) and (max-height: 720px) {
   margin-top: 0.625rem;
  }

  @media (max-width: 767px) and (max-height: 750px) {
    margin-top: 0.625rem;
  }

  @media (max-width: 767px) and (max-height: 670px) {
    margin-top: 0.375rem;
  }
`

export const WelcomeTitle = styled.h2`
  font-size: ${({theme}) => theme.fontSizes.subtitle};
  font-weight: ${({theme}) => theme.fontWeights.bold};
  color: ${({theme}) => theme.colors.black}

  @media (max-width: 767px) and (max-height: 750px) {
    font-size: 1.25rem;
    line-height: 1.15;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    font-size: 1.125rem;
    line-height: 1.1;
  }
`

export const WelcomeSubtitle = styled.p`
  font-size: ${({theme}) => theme.fontSizes.normal};
  font-weight: ${({theme}) => theme.fontWeights.regular};
  color: ${({theme}) => theme.colors.black}

  @media (max-width: 767px) and (max-height: 750px) {
    font-size: 0.875rem;
    line-height: 1.2;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    font-size: 0.75rem;
  }
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

  @media (max-width: 767px) and (max-height: 750px) {
    margin-top: 0.625rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    margin-top: 0.375rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`
export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (max-width: 767px) and (max-height: 750px) {
    gap: 0.625rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    gap: 0.375rem;
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  gap: 4px;

  @media (max-width: 767px) and (max-height: 650px) {
    gap: 2px;
  }
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

  @media (max-width: 767px) and (max-height: 750px) {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    min-height: 44px;
    padding: 0.625rem 1.25rem;
  }
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

  @media (max-width: 767px) and (max-height: 750px) {
    height: 2.75rem;
    font-size: 1rem;
  }

  @media (max-width: 767px) and (max-height: 670px) {
    max-height: 32px;
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

  @media (max-width: 767px) and (max-height: 750px) {
    margin-top: 0.625rem;
  }

  @media (max-width: 767px) and (max-height: 650px) {
    margin-top: 0.375rem;
  }
`

export const RegisterText = styled.p`
  color: ${({ theme }) => theme.colors.darkColor};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.normal};

  @media (max-width: 767px) and (max-height: 650px) {
    font-size: 0.875rem;
  }
`

export const RegisterLink = styled.a`
  color: ${({ theme }) => theme.colors.brand};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.normal};

  @media (max-width: 767px) and (max-height: 650px) {
    font-size: 0.875rem;
  }
`
