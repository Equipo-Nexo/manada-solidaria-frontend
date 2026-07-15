import type { UseFormRegisterReturn } from 'react-hook-form'
import { Phone } from '../../components/icons'
import * as S from './newAnimalPostForm.styles'

interface PhoneInputProps {
  areaCodeRegistration: UseFormRegisterReturn<'areaCode'>
  phoneNumberRegistration: UseFormRegisterReturn<'phoneNumber'>
  error?: string
}

function PhoneInputComponent({
  areaCodeRegistration,
  phoneNumberRegistration,
  error,
}: PhoneInputProps) {
  return (
    <>
      <S.PhoneNumberContainer>
        <S.AreaCodeWrapper>
          <S.PhoneGlyph><Phone aria-hidden="true" /></S.PhoneGlyph>
          <S.AreaCode
            aria-label="Código de área"
            inputMode="numeric"
            placeholder="353"
            aria-invalid={Boolean(error)}
            {...areaCodeRegistration}
          />
        </S.AreaCodeWrapper>
        <S.PhoneNumber
          aria-label="Número de teléfono"
          inputMode="numeric"
          placeholder="56523551"
          aria-invalid={Boolean(error)}
          {...phoneNumberRegistration}
        />
      </S.PhoneNumberContainer>
      {error && <S.ErrorMessage role="alert">{error}</S.ErrorMessage>}
    </>
  )
}

export default PhoneInputComponent
