import type { InputHTMLAttributes, Ref } from 'react'
import { Phone } from '../icons'
import * as S from './Inputs.styles'
import FormErrorMessage from '../error/ErrorMessage'

interface PhoneInputProps {
  areaCodeProps: InputHTMLAttributes<HTMLInputElement>
  phoneNumberProps: InputHTMLAttributes<HTMLInputElement>
  areaCodeRef?: Ref<HTMLInputElement>
  phoneNumberRef?: Ref<HTMLInputElement>
  error?: string
}

function PhoneInputComponent({
  areaCodeProps,
  phoneNumberProps,
  areaCodeRef,
  phoneNumberRef,
  error,
}: PhoneInputProps) {
  return (
    <>
      <S.PhoneNumberContainer>
        <S.AreaCodeWrapper>
          <S.PhoneGlyph><Phone aria-hidden="true" /></S.PhoneGlyph>
          <S.AreaCode
            ref={areaCodeRef}
            aria-label="Código de área"
            inputMode="numeric"
            placeholder="353"
            aria-invalid={Boolean(error)}
            {...areaCodeProps}
          />
        </S.AreaCodeWrapper>
        <S.PhoneNumber
          ref={phoneNumberRef}
          aria-label="Número de teléfono"
          inputMode="numeric"
          placeholder="56523551"
          aria-invalid={Boolean(error)}
          {...phoneNumberProps}
        />
      </S.PhoneNumberContainer>
      <FormErrorMessage message={error} />
    </>
  )
}

export default PhoneInputComponent
