import styled from 'styled-components'
import { fieldFocusVisible, focusVisible } from '../../../styles/interactions'

export const Page = styled.section`
  width: min(100%, 560px);
  min-height: 100svh;
  margin: 0 auto;
  padding: 16px;
  color: ${({ theme }) => theme.colors.darkColor};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  text-align: left;

  @media (min-width: 600px) {
    padding: 28px 24px 48px;
  }
`

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 16px;
`

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 0.8;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.header2.lineHeight};
  text-align: left;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.colors.background};
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.black};

  > [role='alert'] {
    margin-top: 12px;
  }
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.black};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.typography.header3.fontSize};
`

export const Required = styled.span`
  color: ${({ theme }) => theme.colors.brand};
`

export const Input = styled.input`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 13px 18px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    opacity: 1;
  }

  ${fieldFocusVisible}
`

export const TextArea = styled.textarea`
  min-height: 155px;
  resize: vertical;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 14px 18px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    opacity: 1;
  }

  ${fieldFocusVisible}
`

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
`

export const PhoneFields = styled.div`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 8px;
`


export const InputWithIcon = styled.div`
  position: relative;

  input {
    padding-left: 50px;
  }
`

export const FieldIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 18px;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.darkColor};
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
  }
`

export const HelpText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.descriptive.fontSize};
  font-weight: ${({ theme }) => theme.typography.descriptive.fontWeight};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
`

export const MapPreview = styled.div`
  height: 201px;
  position: relative;
  overflow: hidden;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  background:
    linear-gradient(35deg, transparent 48%, ${({ theme }) => theme.colors.stroke} 49% 51%, transparent 52%),
    linear-gradient(145deg, transparent 46%, ${({ theme }) => theme.colors.secondary} 47% 49%, transparent 50%),
    linear-gradient(8deg, transparent 48%, ${({ theme }) => theme.colors.stroke} 49% 51%, transparent 52%),
    ${({ theme }) => theme.colors.neutral};
  opacity: 0.86;
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};
  ${focusVisible}

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`

export const Loading = styled.p`
  color: ${({ theme }) => theme.colors.darkColor};
  text-align: center;
`
