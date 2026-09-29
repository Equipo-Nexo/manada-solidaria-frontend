import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Mail } from "@icons/index";
import { ErrorMessage } from "@components/index";
import { useToast } from "@hooks/toast/useToast";
import {
  passwordRecoveryRequestSchema,
  type PasswordRecoveryRequestValues,
} from "@auth/app/schemas/passwordRecoveryRequestSchema";
import * as S from "./PasswordRecoveryRequest.styles";

export default function PasswordRecoveryRequest() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryRequestValues>({
    resolver: yupResolver(passwordRecoveryRequestSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  });

  const handleRequest = () => {
    toast.information(
      "Envío no disponible",
      "La recuperación de contraseña todavía no está disponible. Intentá nuevamente más tarde.",
    );
  };

  return (
    <S.Page>
      <S.Panel aria-labelledby="recovery-title">
        <S.Brand>
          <S.AppLogo src="/logo.svg" alt="Manada Solidaria" />
          <S.BrandName>Manada Solidaria</S.BrandName>
        </S.Brand>
        <S.Introduction>
          <S.Title id="recovery-title">Recuperar Contraseña</S.Title>
          <S.Description>
            Ingresá tu correo electrónico y te enviaremos un código de
            verificación para que puedas crear una nueva contraseña.
          </S.Description>
        </S.Introduction>
        <S.Form onSubmit={handleSubmit(handleRequest)} noValidate>
          <S.Field>
            <S.Label htmlFor="recovery-email">
              <Mail aria-hidden="true" />
              Email
            </S.Label>
            <S.Input
              id="recovery-email"
              type="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "recovery-email-error" : undefined
              }
              $hasError={Boolean(errors.email)}
              {...register("email")}
            />
            <ErrorMessage
              id="recovery-email-error"
              message={errors.email?.message}
            />
          </S.Field>
          <S.SubmitButton type="submit">Enviar Código</S.SubmitButton>
          <S.BackLink to="/login">Volver al inicio de sesión</S.BackLink>
        </S.Form>
      </S.Panel>
      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  );
}
