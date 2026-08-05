import styled from 'styled-components'
import { MainContainer as BaseMainContainer } from '../newAnimalPost/Form.styles'
import { fieldFocusVisible } from '@styles/interactions'

export const MainContainer = styled(BaseMainContainer)`
  input,
  select,
  textarea {
    color: ${({ theme }) => theme.colors.black};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.darkColorMuted};
    opacity: 1;
  }
`

const FORM_STYLE_VALUES = {
  borderRadius: '12px',
  contentPadding: '16px',
  contentGap: '16px',
  controlHeight: '56px',
  transitionDuration: '160ms',
} as const

export const Page = styled.section`
  width: min(100%, 560px);
  min-height: 100svh;
  margin: 0 auto;
  padding: ${FORM_STYLE_VALUES.contentPadding};
  color: ${({ theme }) => theme.colors.darkColor};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.body};
  @media (min-width: 600px) { padding: 28px 24px 48px; }
`

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: ${FORM_STYLE_VALUES.contentGap};
`

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
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
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.header2.fontSize};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-align: left;
`

export const FieldGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: ${FORM_STYLE_VALUES.contentGap}
;`

export const CompactSelectorsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`
export const Required = styled.span`
  color: ${({ theme }) => theme.colors.brand
  };`

export const OptionsGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: left;
  gap: 8px
;`

export const Input = styled.input`
  width: 100%;
  height: ${FORM_STYLE_VALUES.controlHeight};
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: ${FORM_STYLE_VALUES.borderRadius};
  padding: ${FORM_STYLE_VALUES.contentPadding};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; }
  ${fieldFocusVisible}
`
export const IconInputWrapper = styled.div`
  position: relative;
  svg { position: absolute; z-index: 1; top: 18px; left: 12px; width: 20px; height: 20px; color: ${({ theme }) => theme.colors.darkColor}; }
  ${Input} { padding-left: 42px; }
`
export const MapContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  width: 100%; 
  gap: 8px;
`
export const MapPlaceholder = styled.div`
  position: relative;
  width: 100%;
  height: 168px;
  overflow: hidden;
  border-radius: 10px;
  background:
    linear-gradient(28deg, transparent 46%, ${({ theme }) => theme.colors.stroke} 47% 49%, transparent 50%),
    linear-gradient(145deg, transparent 42%, ${({ theme }) => theme.colors.tertiary} 43% 46%, transparent 47%),
    ${({ theme }) => theme.colors.neutral};
`
export const Suggestion = styled.p`
  margin: 0 4px; 
  color: ${({ theme }) => theme.colors.darkColor}; 
  ${({ theme }) => theme.typography.descriptive};
  text-align: left
;`


//Colors component
export const ColorsContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  padding: 0 2px;
`
export const ColorItem = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  flex: 0 0 40px;
`

export const ColorName = styled.span<{ $selected: boolean }>`
  margin-top: 6px; 
  color: ${({ theme }) => theme.colors.black}; 
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ $selected, theme }) => ($selected ? '13px' : theme.typography.descriptive.fontSize)};
  font-weight: ${({ $selected, theme }) => ($selected ? theme.fontWeights.semibold : theme.fontWeights.medium)};
  line-height: ${({ theme }) => theme.typography.descriptive.lineHeight};
  transition: font-size ${FORM_STYLE_VALUES.transitionDuration} ease, font-weight ${FORM_STYLE_VALUES.transitionDuration} ease;
`

export const Color = styled.button.attrs({ type: 'button' }) <{ $color: string; $selected: boolean }>`
  width: 40px;
  height: 40px;
  display: inline-flex;
  cursor:pointer;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ $color, theme }) => $color === '#FFFFFF' ? theme.colors.stroke : $color};
  border-radius: 50%;
  padding: 0;
  background: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.darkColor};
  box-shadow: ${({ $color, $selected, theme }) =>
    $selected
      ? `0 0 0 3px ${theme.colors.background}, 0 0 0 6px ${$color === '#FFFFFF' ? theme.colors.stroke : $color}`
      : 'none'};
  transition: box-shadow ${FORM_STYLE_VALUES.transitionDuration} ease;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 7px;
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 132px;
  resize: none;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: ${FORM_STYLE_VALUES.borderRadius};
  padding: ${FORM_STYLE_VALUES.contentPadding};
  color: ${({ theme }) => theme.colors.darkColor};
  ${({ theme }) => theme.typography.body};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; }
  ${fieldFocusVisible}
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
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.action.fontSize};
  font-weight: ${({ theme }) => theme.typography.action.fontWeight};
  line-height: ${({ theme }) => theme.typography.header3.lineHeight};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;
