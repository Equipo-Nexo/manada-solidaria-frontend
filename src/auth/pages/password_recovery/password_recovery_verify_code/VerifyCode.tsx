import { useId } from "react";
import { ErrorMessage } from "@components/index";
import { useVerifyCode } from "@auth/hooks/useVerifyCode";
import * as S from "./VerifyCode.styles";
import Arrow from "@/common/icons/Arrow";
import { Clock } from "@/common/icons";

export default function VerifyCode() {
  const errorId = useId();
  const {
    digits,
    codeError,
    hasEmail,
    isVerifying,
    isResendDisabled,
    resendLabel,
    updateDigits,
    setInputRef,
    handlePaste,
    handleKeyDown,
    handleFormSubmit,
    handleResend,
  } = useVerifyCode();

  return (
    <S.Page>
      <S.Panel>
        <S.BackButton
          to="/recuperar-contrasena"
          aria-label="Volver a la página de recuperación de contraseña"
        >
          <Arrow aria-hidden="true" />
        </S.BackButton>
        <S.Content>
          <S.AppLogo src="/logo.svg" alt="Manada Solidaria" />
          <S.Title>Verificar Código</S.Title>
          <S.Description>
            Ingresá el código de 6 dígitos que enviamos a tu correo electrónico.
          </S.Description>
          <S.Form
            noValidate
            aria-busy={isVerifying}
            onSubmit={handleFormSubmit}
          >
            <S.CodeFields role="group" aria-label="Código de verificación">
              {digits.map((digit, index) => (
                <S.Digit
                  key={index}
                  ref={(element) => setInputRef(index, element)}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Dígito ${index + 1} de ${digits.length}`}
                  aria-invalid={Boolean(codeError)}
                  aria-describedby={codeError ? errorId : undefined}
                  $hasError={Boolean(codeError)}
                  value={digit}
                  disabled={isVerifying}
                  onFocus={(event) => event.currentTarget.select()}
                  onChange={(event) => updateDigits(index, event.target.value)}
                  onPaste={(event) => handlePaste(index, event)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                />
              ))}
            </S.CodeFields>
            <ErrorMessage id={errorId} message={codeError} />
            <S.Validity>El código tiene una validez de 10 minutos.</S.Validity>
            <S.ResendArea>
              <S.Advice>
                <Clock width="34" height="34" />
                Si no lo recibiste, podés solicitar un nuevo código.
              </S.Advice>
              {hasEmail ? (
                <S.ResendButton
                  type="button"
                  disabled={isResendDisabled}
                  onClick={() => void handleResend()}
                >
                  {resendLabel}
                </S.ResendButton>
              ) : (
                <S.BackLink to="/recuperar-contrasena">
                  Ingresar correo nuevamente
                </S.BackLink>
              )}
            </S.ResendArea>
            <S.SubmitButton type="submit" disabled={isVerifying}>
              {isVerifying ? "Verificando..." : "Verificar Código"}
            </S.SubmitButton>
            <S.BackLink to="/login">Volver al inicio de sesión</S.BackLink>
          </S.Form>
        </S.Content>
      </S.Panel>
      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  );
}
