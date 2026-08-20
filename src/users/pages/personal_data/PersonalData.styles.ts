import { fieldFocusVisible } from '@/common/styles/interactions'
import styled from 'styled-components'

const cardShadow = '0 4px 8px rgb(0 0 0 / 25%)'

export const MainContainer = styled.form`
  position: relative;
  width: min(100%, 390px);
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  color: ${({ theme }) => theme.colors.black};
  @media (min-width: 768px) { width: min(100%, 480px); }
`

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

export const BackButton = styled.button`
  width: 48px;
  height: 48px;
  display: inline-flex;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  svg {
    width: 48px;
    height: 48px;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }
`;

export const TitlesContainer = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  white-space: nowrap;
`;

export const AdviceWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
`
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 20px;
  text-align: left;
`

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  line-height: 16px;
`

export const PersonalDataContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  margin-bottom:16px;
  border-radius: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${cardShadow};
  > label:not(:first-child) { margin-top: 8px; }
`
export const UsernameContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 12px 14px;
  background: rgb(245 231 212 / 45%);

  @media (max-width: 420px) {
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 10px;
    padding: 10px 12px;
  }
`

export const UsernameIcon = styled.span`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.secondary};

  svg {
    width: 21px;
    height: 21px;
  }

  @media (max-width: 420px) {
    width: 36px;
    height: 36px;

    svg {
      width: 19px;
      height: 19px;
    }
  }
`

export const UsernameContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

export const UsernameLabel = styled.span`
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export const Username = styled.span`
  max-width: 100%;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
  overflow-wrap: anywhere;
`

export const Label = styled.label`
  width: 100%;
  align-self: stretch;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`
export const Required = styled.span`color: ${({ theme }) => theme.colors.brand};`

export const Input = styled.input`
  width: 100%;
  height: 52px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  padding: 14px 24px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; opacity: 0.65; }
  ${fieldFocusVisible}
  &:disabled {
    opacity: 1;
    cursor: default;
    pointer-events: none;
  }
`

export const PasswordContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  border-radius: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${cardShadow};
`

export const ChangePasswordButton = styled.button`
  width: 100%;
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.brand};
  ${({ theme }) => theme.typography.action};
  cursor: pointer;
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`


export const SubmitButton = styled.button`
  width: 100%;
  max-width: 390px;
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => theme.typography.action};
  cursor: pointer;
  transition: background 160ms ease;
  svg { width: 20px; height: 20px; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
  &:disabled {
    background: ${({ theme }) => theme.colors.stroke};
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    max-width: 480px;
  }
`
