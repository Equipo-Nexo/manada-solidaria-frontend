import styled from 'styled-components'

export const Page = styled.section`
  width: min(100%, 560px);
  min-height: 100svh;
  margin: 0 auto;
  padding: 16px 16px 16px 16px;
  color: ${({ theme }) => theme.colors.darkColor};
  background: ${({ theme }) => theme.colors.background};
  @media (min-width: 600px) { padding: 28px 24px 48px; }
`

export const Header = styled.header`
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 16px;
`

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
  svg { width: 30px; height: 30px; stroke-width: 2.7; }
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; }
`

export const PageTitle = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black};
  font: 700 20px/28px 
  ${({ theme }) => theme.fonts.body};
  text-align: left;
`

export const MainContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 16px;
`

export const FieldGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 16px
;`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font: 700 14px/20px ${({ theme }) => theme.fonts.body};
`
export const Required = styled.span`
  color: ${({ theme }) => theme.colors.error
  };`

export const UploadImageButton = styled.button`
  position: relative;
  width: 100%;
  min-height: 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;
  border: 2px dashed ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.body};
  &:focus-visible { outline: 3px solid ${({ theme }) => theme.colors.focus}; outline-offset: 2px; }
`

export const AdviceContainer = styled.aside`
  display: grid;
  gap: 16px;
  grid-template-columns: 24px 1fr;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.neutral};
  text-align: left;
`
export const AdviceIcon = styled.span`
  color: ${({ theme }) => theme.colors.secondary}; 
  svg { width: 20px; height: 20px; }
`
export const AdviceContent = styled.div``

export const AdviceTitle = styled.h2`
  margin: 0; 
  color: ${({ theme }) => theme.colors.darkColor}; 
  font: 700 13px/18px 
  ${({ theme }) => theme.fonts.body}
;`

export const Advice = styled.p`
  margin: 0; 
  color: ${({ theme }) => theme.colors.darkColor}; 
  font: 500 12px/17px ${({ theme }) => theme.fonts.body}
;`

export const OptionsGroup = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: left;
  gap: 8px
;`

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
  font: 700 16px/18px ${({ theme }) => theme.fonts.body}
;`

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.secondary}; 
  font: 400 12px/15px ${({ theme }) => theme.fonts.body};`
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
export const ErrorMessage = styled.p`margin: -2px 0 0; color: ${({ theme }) => theme.colors.error}; font: 500 12px/16px ${({ theme }) => theme.fonts.body};`
export const OptionsErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-left-width: 4px;
  border-radius: 8px;
  padding: 9px 10px;
  background: ${({ theme }) => `${theme.colors.error}14`};
  color: ${({ theme }) => theme.colors.error};
  font: 600 12px/16px ${({ theme }) => theme.fonts.body};

  svg {
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 56px;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.black};
  font: 400 14px/18px ${({ theme }) => theme.fonts.body};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; }
`
export const IconInputWrapper = styled.div`
  position: relative;
  svg { position: absolute; z-index: 1; top: 18px; left: 12px; width: 20px; height: 20px; color: ${({ theme }) => theme.colors.darkColor}; }
  ${Input} { padding-left: 42px; }
`

export const MapContainer = styled.div`display: flex; flex-direction: column; width: 100%; gap: 8px;`
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
export const MapPin = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border: 6px solid ${({ theme }) => theme.colors.error};
  border-radius: 50% 50% 50% 0;
  background: ${({ theme }) => theme.colors.background};
  transform: translate(-50%, -65%) rotate(-45deg);
`
export const LocationButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColor};
  box-shadow: 0 2px 6px rgb(89 65 55 / 22%);
  font-size: 24px;
`
export const Suggestion = styled.p`
  margin: 0 4px; 
  color: ${({ theme }) => theme.colors.darkColor}; 
  font: 400 12px/14px ${({ theme }) => theme.fonts.body};
  text-align: center
;`

export const AnimalItemContainer = styled.div`display: flex; width: 100%; gap: 12px;`
export const AnimalItem = styled.button<{ $selected: boolean }>`
  min-width: 0;
  width: 100%;
  height: 122px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid ${({ $selected, theme }) => $selected ? theme.colors.darkColor : theme.colors.neutral};
  border-radius: 10px;
  padding: 10px 8px 8px;
  background: ${({ theme }) => theme.colors.neutral};
  cursor: pointer;
`
export const AnimalImage = styled.img`width: 70px; max-width: 100%; height: 70px; object-fit: contain; border-radius: 6px; background: ${({ theme }) => theme.colors.background};`
export const AnimalTitle = styled.span`color: ${({ theme }) => theme.colors.darkColor}; font: 700 12px/16px ${({ theme }) => theme.fonts.body};`

export const SexAgeContainer = styled.div`display: flex; gap: 8px;`
export const SelectField = styled.div`min-width: 0; width: 100%; display: flex; flex-direction: column; gap: 8px;`
export const Select = styled.select`
  width: 100%;
  height: 56px;
  min-width: 0;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  padding: 8px 10px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font: 400 12px/18px ${({ theme }) => theme.fonts.body};
`



export const ColorsContainer = styled.div`display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; overflow-x: auto; padding: 0 2px;`
export const ColorItem = styled.div`display: flex; flex-direction: column; align-items: center; flex: 0 0 40px;`
export const ColorName = styled.span`margin-top: 4px; color: ${({ theme }) => theme.colors.black}; font: 400 10px/14px ${({ theme }) => theme.fonts.body};`
export const Color = styled.button.attrs({ type: 'button' }) <{ $color: string; $selected: boolean }>`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 50%;
  padding: 0;
  background: ${({ $color }) => $color};
  color: ${({ theme }) => theme.colors.darkColor};
  transform: scale(${({ $selected }) => $selected ? 1.18 : 1});
  transition: transform 160ms ease;
`

export const PhoneNumberContainer = styled.div`display: flex; gap: 6px;`
export const AreaCodeWrapper = styled.div`position: relative; flex: 0 0 100px;`
export const PhoneGlyph = styled.span`position: absolute; z-index: 1; top: 18px; left: 12px; color: ${({ theme }) => theme.colors.darkColor}; svg { width: 18px; height: 18px; }`
export const AreaCode = styled(Input)`width: 100%; padding-left: 40px;`
export const PhoneNumber = styled(Input)`min-width: 0;`
export const PhoneSuggestion = styled.p`margin: -2px 0 0; color: ${({ theme }) => theme.colors.darkColorMuted}; font: 400 10px/14px ${({ theme }) => theme.fonts.body};`
export const TextArea = styled.textarea`
  width: 100%;
  height: 112px;
  resize: none;
  border: 2px solid ${({ theme }) => theme.colors.stroke};
  border-radius: 10px;
  padding: 12px;
  color: ${({ theme }) => theme.colors.darkColor};
  font: 400 12px/18px ${({ theme }) => theme.fonts.body};
  &::placeholder { color: ${({ theme }) => theme.colors.darkColorMuted}; }
`

export const SwitchGroup = styled.div`display: flex; flex-direction: column; gap: 8px; padding: 14px; border: 2px solid ${({ theme }) => theme.colors.stroke}; border-radius: 10px; background: ${({ theme }) => theme.colors.neutral};`
export const SwitchRow = styled.label`display: flex; align-items: center; justify-content: space-between; gap: 16px; color: ${({ theme }) => theme.colors.darkColor}; cursor: pointer; font: 400 14px/20px ${({ theme }) => theme.fonts.body};`
export const SwitchLabelContent = styled.span`display: inline-flex; align-items: center; gap: 12px; svg { width: 18px; height: 18px; color: ${({ theme }) => theme.colors.secondary}; }`
export const SwitchInput = styled.input`position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%);`
export const SwitchControl = styled.span`
  position: relative;
  width: 40px;
  height: 22px;
  flex: 0 0 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.stroke};
  &::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: ${({ theme }) => theme.colors.background}; transition: transform 160ms ease; }
  ${SwitchInput}:checked + & { background: ${({ theme }) => theme.colors.secondary}; }
  ${SwitchInput}:checked + &::after { transform: translateX(18px); }
`
export const SwitchHelpText = styled.p`
  margin: 0 52px 0 30px;
  color: ${({ theme }) => theme.colors.darkColorMuted};
  font: 400 11px/16px ${({ theme }) => theme.fonts.body};
`

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral};
  box-shadow: 0 8px 14px rgb(89 65 55 / 20%);
  cursor: pointer;
  font: 500 14px/20px ${({ theme }) => theme.fonts.body};
  svg { width: 18px; height: 18px; }
`
