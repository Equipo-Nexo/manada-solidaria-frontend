import styled from "styled-components";
import { fieldFocusVisible } from "../../styles/interactions";


export const Input = styled.input`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typography.body};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; }
  ${fieldFocusVisible}
`

export const PhoneNumberContainer = styled.div`display: flex; gap: 6px;`
export const AreaCodeWrapper = styled.div`position: relative; flex: 0 0 100px;`
export const PhoneGlyph = styled.span`position: absolute; z-index: 1; top: 18px; left: 12px; color: ${({ theme }) => theme.colors.darkColor}; svg { width: 18px; height: 18px; }`
export const AreaCode = styled(Input)`width: 100%; padding-left: 40px;`
export const PhoneNumber = styled(Input)`min-width: 0;`

export const SelectField = styled.div`min-width: 0; width: 100%; display: flex; flex-direction: column; gap: 8px;`
export const Select = styled.select<{ $hasValue: boolean }>`
  width: 100%;
  height: 56px;
  min-width: 0;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  padding: 8px 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.colors.darkColor : theme.colors.darkColorMuted};
  ${({ theme }) => theme.typography.body};
  ${fieldFocusVisible}

  &:focus,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.brand};
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focus};
  }
`

export const OptionLabel = styled.label<{ $selected: boolean }>`
  min-height: 62px;
  display: grid;
  text-align: left;
  grid-template-columns: minmax(0, 1fr) 22px;
  align-items: center;
  border: 2px solid ${({ $selected, theme }) => $selected ? theme.colors.stroke : theme.colors.stroke};
  border-radius: 12px;
  padding: 0px 16px 0px 16px;
  background: ${({ $selected, theme }) => $selected ? theme.colors.neutral : theme.colors.background};
  cursor: pointer;

  &:focus-within,
  &:has(input:focus-visible) {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`
export const RadioInput = styled.input`
  position: absolute; 
  width: 1px; 
  height:1px;
  overflow: hidden; 
`
export const OptionItem = styled.span`
  min-width: 0; 
  display: flex; 
  flex-direction: column; 
  gap: 2px;
`
export const Title = styled.span`
  color: ${({ theme }) => theme.colors.darkColor}; 
  ${({ theme }) => theme.typography.header3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
;`

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.secondary}; 
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
 
`


export const SelectionIndicator = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
  
  ${OptionLabel}[data-selected='true'] & { background: ${({ theme }) => theme.colors.secondary}; color: ${({ theme }) => theme.colors.background}; }
`

export const FormErrorMessage = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => `${theme.colors.error}24`};
  border-left: 3px solid ${({ theme }) => theme.colors.error};
  border-radius: 10px;
  padding: 8px 12px;
  background: ${({ theme }) => `${theme.colors.error}12`};
  color: ${({ theme }) => theme.colors.error};
  box-shadow:
    0 1px 2px ${({ theme }) => `${theme.colors.error}0A`},
    0 8px 24px ${({ theme }) => `${theme.colors.error}0D`};
  ${({ theme }) => theme.typography.descriptive};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  animation: error-message-enter 180ms ease-out;

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2.25;
  }

  @keyframes error-message-enter {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
