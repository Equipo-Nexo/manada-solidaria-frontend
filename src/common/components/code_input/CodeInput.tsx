import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import * as S from "./CodeInput.styles";

type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
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

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length }, (_, index) => value[index] ?? ""),
  );

  useEffect(() => {
    setDigits(Array.from({ length }, (_, index) => value[index] ?? ""));
  }, [value, length]);

  const updateDigits = (index: number, inputValue: string) => {
    const numbers = inputValue.replace(/\D/g, "").slice(0, length);

    const next = [...digits];

    if (!numbers) {
      next[index] = "";
    } else {
      numbers.split("").forEach((digit, offset) => {
        if (index + offset < length) {
          next[index + offset] = digit;
        }
      });
    }

    setDigits(next);
    onChange(next.join(""));

    if (numbers) {
      const nextIndex = Math.min(index + numbers.length, length - 1);

      inputs.current[nextIndex]?.focus();
    }
  };

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    updateDigits(index, event.clipboardData.getData("text"));
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();

      updateDigits(index - 1, "");
      inputs.current[index - 1]?.focus();
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
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          aria-label={`Dígito ${index + 1} de ${length}`}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          $hasError={hasError}
          value={digit}
          disabled={disabled}
          onFocus={(event) => event.currentTarget.select()}
          onChange={(event) => updateDigits(index, event.target.value)}
          onPaste={(event) => handlePaste(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
        />
      ))}
    </S.CodeFields>
  );
}
