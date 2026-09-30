import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Mail } from "@icons/index";
import { ErrorMessage } from "@components/index";
import { useToast } from "@hooks/toast/useToast";
import {
  passwordRecoveryRequestSchema,
  type PasswordRecoveryRequestValues,
} from "@auth/app/schemas/passwordRecoveryRequestSchema";
import * as S from "./PasswordRecoveryEmail.styles";
import { useRequestPasswordRecoveryMutation } from "@/auth/app/api/passwordRecoveryApi";
import { useNavigate } from "react-router-dom";

export default function PasswordRecoveryEmail() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryRequestValues>({
    resolver: yupResolver(passwordRecoveryRequestSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const [requestPasswordRecovery, { isLoading }] =
    useRequestPasswordRecoveryMutation();

  const handleRequest = (values: PasswordRecoveryRequestValues) => {
    if (isLoading) return;
    requestPasswordRecovery({
      email: values.email,
    })
      .unwrap()
      .then(() => {
        navigate("/recuperar-contrasena/codigo-enviado", {
          state: { email: values.email },
        });
      })
      .catch(() => {
        toast.error(
          "No pudimos enviar el código",
          "Revisá el correo e intentá nuevamente.",
        );
      });
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
        <S.Form
          onSubmit={handleSubmit(handleRequest)}
          aria-busy={isLoading}
          noValidate
        >
          <S.Field>
            <S.Label htmlFor="recovery-email">
              <Mail aria-hidden="true" />
              Email
            </S.Label>
            <S.Input
              id="recovery-email"
              type="email"
              disabled={isLoading}
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
          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Código"}
          </S.SubmitButton>
          <S.BackLink to="/login">Volver al inicio de sesión</S.BackLink>
        </S.Form>
      </S.Panel>
      <S.Footer>© 2026 Manada Solidaria - Cuidando huellas juntos</S.Footer>
    </S.Page>
  );
}
