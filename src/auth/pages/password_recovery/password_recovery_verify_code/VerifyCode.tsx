import { ErrorMessage } from "@components/index";
import * as S from "./VerifyCode.styles";
import Arrow from "@/common/icons/Arrow";
import { Clock } from "@/common/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/common/hooks/toast/useToast";
import { useCooldownTimer } from "@/common/hooks/cooldown_timer/useCooldownTimer";
import {
  useRequestPasswordRecoveryMutation,
  useVerifyCodeMutation,
} from "@/auth/app/api/passwordRecoveryApi";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  verifyCodeSchema,
  type VerifyCodeValues,
} from "@/auth/app/schemas/verifyCodeSchema";
import { Controller, useForm } from "react-hook-form";
import CodeInput from "@/common/components/code_input/CodeInput";

const RESEND_DELAY_SECONDS = 60;
export default function VerifyCode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const email = typeof state?.email === "string" ? state.email : "";
  const hasEmail = Boolean(email);
  const [resend, { isLoading: isResending }] =
    useRequestPasswordRecoveryMutation();
  const [verifyCode, { isLoading: isVerifying }] = useVerifyCodeMutation();

  const {
    control,
    clearErrors,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<VerifyCodeValues>({
    resolver: yupResolver(verifyCodeSchema),
    defaultValues: {
      code: Array(6).fill(""),
    },
  });

  const {
    remaining,
    restart: restartCooldown,
    isActive: isCooldownActive,
  } = useCooldownTimer(RESEND_DELAY_SECONDS);

  const handleVerify = (values: VerifyCodeValues) => {
    if (!email) {
      toast.error(
        "No pudimos verificar el código",
        "No encontramos el correo asociado a la recuperación.",
      );
      return;
    }
    verifyCode({
      email,
      code: values.code.join(""),
    })
      .unwrap()
      .then((response) => {
        toast.success("Código verificado con éxito.");
        navigate("/recuperar-contrasena/nueva-contrasena", {
          state: {
            resetToken: response.resetToken,
          },
        });
      })
      .catch(() => {
        toast.error(
          "No pudimos verificar el código",
          "El código ingresado no es válido. Revisalo o solicitá uno nuevo.",
        );
      });
  };

  const handleResend = () => {
    if (isCooldownActive || isResending || !email) {
      return;
    }
    resend({ email })
      .unwrap()
      .then(() => {
        restartCooldown();
        resetField("code");
        clearErrors("code");
        toast.information(
          "Código solicitado",
          "Te enviamos un nuevo código. Los códigos anteriores dejarán de ser válidos.",
        );
      })
      .catch(() => {
        toast.error(
          "No pudimos reenviar el código",
          "Intentá nuevamente en unos instantes.",
        );
      });
  };

  const countdown = `00:${String(remaining).padStart(2, "0")}`;

  const resendLabel = isResending
    ? "Reenviando..."
    : `Reenviar código${isCooldownActive ? ` (${countdown})` : ""}`;

  const isResendDisabled = isCooldownActive || isResending;

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
            onSubmit={handleSubmit(handleVerify)}
          >
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <CodeInput
                  value={field.value}
                  onChange={field.onChange}
                  length={6}
                  disabled={isVerifying}
                  hasError={Boolean(errors.code)}
                />
              )}
            />
            <ErrorMessage message={errors.code?.message} />
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
