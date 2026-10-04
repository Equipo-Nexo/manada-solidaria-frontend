import { useRef, type KeyboardEvent } from "react";
import * as S from "./CodeInput.styles";

type CodeInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
  errorId?: string;
};

export default function CodeInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
  errorId,
}: CodeInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from(
    { length },
    (_, index) => value[index]?.trim() || "",
  );

  const updateDigits = (index: number, inputValue: string) => {
    const numbers = inputValue.replace(/\D/g, "").slice(0, length);

    const next = [...digits];

    if (!numbers) {
      next[index] = "";
    } else {
      numbers.split("").forEach((digit, offset) => {
        const targetIndex = index + offset;

        if (targetIndex < length) {
          next[targetIndex] = digit;
        }
      });
    }
    onChange(next);

    if (numbers) {
      const nextIndex = Math.min(index + numbers.length, length - 1);
      inputs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      if (digits[index]) {
        updateDigits(index, "");
      } else if (index > 0) {
        updateDigits(index - 1, "");
      }
      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const nextIndex = Math.max(0, Math.min(length - 1, index + direction));
      inputs.current[nextIndex]?.focus();
    }
  };
  return (
    <S.CodeFields role="group" aria-label="Código de verificación">
      {digits.map((digit, index) => (
        <S.Digit
          key={index}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Dígito ${index + 1} de ${length}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          $hasError={hasError}
          value={digit}
          disabled={disabled}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => updateDigits(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
        />
      ))}
    </S.CodeFields>
  );
}
