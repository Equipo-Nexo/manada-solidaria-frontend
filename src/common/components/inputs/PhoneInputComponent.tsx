import type { FocusEventHandler, Ref } from "react";
import { Phone } from "../../icons";
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
  showIcon?: boolean;
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
  showIcon = true,
  error,
}: PhoneInputProps) {
  return (
    <>
      <S.PhoneNumberContainer>
        <S.AreaCodeWrapper>
          {showIcon && (
            <S.PhoneGlyph>
              <Phone aria-hidden="true" />
            </S.PhoneGlyph>
          )}
          <StyledMaskedInput
            type="tel"
            autoComplete="tel-area-code"
            inputRef={areaCodeRef}
            maskType="areaCode"
            value={areaCodeValue}
            aria-label="Código de área"
            inputMode="numeric"
            placeholder={areaCodePlaceholder}
            $hasLeftIcon={showIcon}
            aria-invalid={Boolean(error)}
            onAccept={(value) => onAreaCodeChange(String(value))}
            onBlur={onAreaCodeBlur}
          />
        </S.AreaCodeWrapper>
        <StyledMaskedInput
          type="tel"
          autoComplete="tel-local"
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
