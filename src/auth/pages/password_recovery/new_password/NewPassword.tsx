import { useId } from "react";
import { Eye, EyeOff, Lock, Check } from "@icons/index";
import { ErrorMessage } from "@components/index";
import { useNewPassword } from "@auth/hooks/useNewPassword";
import * as S from "./NewPassword.styles";

export default function NewPassword() {
  const passwordId = useId();
  const confirmationId = useId();
  const {
    register,
    errors,
    requirements,
    showPassword,
    showConfirmation,
    togglePassword,
    toggleConfirmation,
    handleFormSubmit,
  } = useNewPassword();
  return (
    <S.Page>
      <S.Panel>
        <S.LockBadge>
          <Lock aria-hidden="true" />
        </S.LockBadge>
        <S.Introduction>
          <S.Title>Nueva Contraseña</S.Title>
          <S.Description>
            Ingresa una nueva contraseña para volver a acceder a tu cuenta.
          </S.Description>
        </S.Introduction>
        <S.Form noValidate onSubmit={handleFormSubmit}>
          <S.Field>
            <S.Label htmlFor={passwordId}>Nueva Contraseña</S.Label>
            <S.PasswordWrapper>
              <S.Input
                id={passwordId}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder={showPassword ? "Nueva contraseña" : "********"}
                $hasError={Boolean(errors.password)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? `${passwordId}-error` : undefined
                }
                {...register("password")}
              />
              <S.Toggle
                type="button"
                aria-label={
                  showPassword
                    ? "Ocultar nueva contraseña"
                    : "Mostrar nueva contraseña"
                }
                aria-pressed={showPassword}
                onClick={togglePassword}
              >
                {showPassword ? (
                  <EyeOff aria-hidden="true" />
                ) : (
                  <Eye aria-hidden="true" />
                )}
              </S.Toggle>
            </S.PasswordWrapper>
            <ErrorMessage
              id={`${passwordId}-error`}
              message={errors.password?.message}
            />
            <S.Requirements aria-label="Requisitos de la contraseña">
              {requirements.map(({ key, label, met }) => (
                <S.Requirement key={key}>
                  <S.RequirementIcon $met={met}>
                    {met && <Check aria-hidden="true" />}
                  </S.RequirementIcon>
                  <span>{label}</span>
                  <S.AccessibleStatus>
                    {met ? "Cumplido" : "Pendiente"}
                  </S.AccessibleStatus>
                </S.Requirement>
              ))}
            </S.Requirements>
          </S.Field>
          <S.Field>
            <S.Label htmlFor={confirmationId}>Repetir Contraseña</S.Label>
            <S.PasswordWrapper>
              <S.Input
                id={confirmationId}
                type={showConfirmation ? "text" : "password"}
                autoComplete="new-password"
                placeholder={
                  showConfirmation ? "Repetir contraseña" : "********"
                }
                $hasError={Boolean(errors.confirmPassword)}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? `${confirmationId}-error` : undefined
                }
                {...register("confirmPassword")}
              />
              <S.Toggle
                type="button"
                aria-label={
                  showConfirmation
                    ? "Ocultar confirmación"
                    : "Mostrar confirmación"
                }
                aria-pressed={showConfirmation}
                onClick={toggleConfirmation}
              >
                {showConfirmation ? (
                  <EyeOff aria-hidden="true" />
                ) : (
                  <Eye aria-hidden="true" />
                )}
              </S.Toggle>
            </S.PasswordWrapper>
            <ErrorMessage
              id={`${confirmationId}-error`}
              message={errors.confirmPassword?.message}
            />
          </S.Field>
          <S.SubmitButton type="submit">Actualizar Contraseña</S.SubmitButton>
        </S.Form>
      </S.Panel>
      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  );
}
