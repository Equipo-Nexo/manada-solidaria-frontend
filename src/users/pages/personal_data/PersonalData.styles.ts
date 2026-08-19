import { fieldFocusVisible } from '@/common/styles/interactions'
import styled from 'styled-components'

const cardShadow = '0 4px 8px rgb(0 0 0 / 25%)'

export const MainContainer = styled.form`
  position: relative;
  width: min(100%, 390px);
  display: flex;
  flex-direction: column;
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


export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  object-fit: cover;
`

export const EditProfileImageButton = styled.button`
  position: absolute;
  right: -4px;
  bottom: -4px;
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  padding: 0;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  transition: background 160ms ease, box-shadow 160ms ease, transform 160ms ease;

  svg { width: 19px; height: 19px; }
  svg path { fill: currentColor; }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.brandHover};
      box-shadow: 0 5px 12px rgb(234 95 9 / 28%);
      transform: translateY(-1px);
    }
  }

  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`

export const ProfileName = styled.h2`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 24px;
`

export const ProfileEmail = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  ${({ theme }) => theme.typography.body};
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
  border-radius: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${cardShadow};

  > label:not(:first-child) { margin-top: 8px; }
`

export const Label = styled.label`
  width: 100%;
  align-self: stretch;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const Required = styled.span`color: ${({ theme }) => theme.colors.brand};`

interface InputProps { $isEditable?: boolean; }

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 52px;
  border: 2px solid ${({ $isEditable, theme }) => $isEditable ? 'transparent' : theme.colors.stroke};
  border-radius: 10px;
  padding: 14px 24px;
  background: ${({ $isEditable, theme }) => $isEditable ? theme.colors.neutral : theme.colors.background};
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
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
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
`
