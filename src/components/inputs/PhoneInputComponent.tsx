import type { FocusEventHandler, Ref } from "react";
import { Phone } from "../icons";
import * as S from "./Inputs.styles";
import FormErrorMessage from "../errors/ErrorMessage";
import { StyledMaskedInput } from "../maskedInput/maskedInput.styles";

interface PhoneInputProps {
  areaCodeValue: string;
  phoneNumberValue: string;
  onAreaCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onAreaCodeBlur?: FocusEventHandler<HTMLInputElement>;
  onPhoneNumberBlur?: FocusEventHandler<HTMLInputElement>;
  areaCodeRef?: Ref<HTMLInputElement>;
  phoneNumberRef?: Ref<HTMLInputElement>;
  areaCodePlaceholder?: string;
  phoneNumberPlaceholder?: string;
  error?: string;
}

function PhoneInputComponent({
  areaCodeValue,
  phoneNumberValue,
  onAreaCodeChange,
  onPhoneNumberChange,
  onAreaCodeBlur,
  onPhoneNumberBlur,
  areaCodeRef,
  phoneNumberRef,
  areaCodePlaceholder = "353",
  phoneNumberPlaceholder = "5652355",
  error,
}: PhoneInputProps) {
  return (
    <>
      <S.PhoneNumberContainer>
        <S.AreaCodeWrapper>
          <S.PhoneGlyph>
            <Phone aria-hidden="true" />
          </S.PhoneGlyph>
          <StyledMaskedInput
            inputRef={areaCodeRef}
            maskType="areaCode"
            value={areaCodeValue}
            aria-label="Código de área"
            inputMode="numeric"
            placeholder={areaCodePlaceholder}
            $hasLeftIcon
            aria-invalid={Boolean(error)}
            onAccept={(value) => onAreaCodeChange(String(value))}
            onBlur={onAreaCodeBlur}
          />
        </S.AreaCodeWrapper>
        <StyledMaskedInput
          inputRef={phoneNumberRef}
          maskType="phoneNumber"
          value={phoneNumberValue}
          aria-label="Número de teléfono"
          inputMode="numeric"
          placeholder={phoneNumberPlaceholder}
          aria-invalid={Boolean(error)}
          onAccept={(value) => onPhoneNumberChange(String(value))}
          onBlur={onPhoneNumberBlur}
        />
      </S.PhoneNumberContainer>
      <FormErrorMessage message={error} />
    </>
  );
}

export default PhoneInputComponent;
