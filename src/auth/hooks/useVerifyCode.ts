import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type SubmitEvent,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@hooks/toast/useToast";
import {
  useRequestPasswordRecoveryMutation,
  useVerifyCodeMutation,
} from "@auth/app/api/passwordRecoveryApi";
import {
  verifyCodeSchema,
  type VerifyCodeValues,
} from "@auth/app/schemas/verifyCodeSchema";

const CODE_LENGTH = 6;
const RESEND_DELAY_SECONDS = 60;
const emptyDigits = () => Array<string>(CODE_LENGTH).fill("");

export function useVerifyCode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = typeof state?.email === "string" ? state.email : "";
  const toast = useToast();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState(emptyDigits);
  const [remaining, setRemaining] = useState(RESEND_DELAY_SECONDS);
  const [resendAt, setResendAt] = useState(
    () => Date.now() + RESEND_DELAY_SECONDS * 1000,
  );
  const [resend, { isLoading: isResending }] =
    useRequestPasswordRecoveryMutation();

  const [verifyCode, { isLoading: isVerifying }] = useVerifyCodeMutation();

  const {
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeValues>({
    resolver: yupResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    const update = () =>
      setRemaining(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [resendAt]);

  const updateDigits = (index: number, value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = [...digits];
    if (!numbers) {
      next[index] = "";
    } else {
      numbers.split("").forEach((digit, offset) => {
        if (index + offset < CODE_LENGTH) next[index + offset] = digit;
      });
    }
    setDigits(next);
    setValue("code", next.join(""), { shouldValidate: Boolean(errors.code) });
    if (numbers)
      inputs.current[
        Math.min(index + numbers.length, CODE_LENGTH - 1)
      ]?.focus();
  };

  const handleResend = () => {
    if (remaining > 0 || isResending || !email) return;

    resend({ email })
      .unwrap()
      .then(() => {
        setRemaining(RESEND_DELAY_SECONDS);
        setResendAt(Date.now() + RESEND_DELAY_SECONDS * 1000);
        setDigits(emptyDigits());
        setValue("code", "");
        clearErrors("code");
        inputs.current[0]?.focus();
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
      const nextIndex = Math.max(
        0,
        Math.min(CODE_LENGTH - 1, index + direction),
      );
      inputs.current[nextIndex]?.focus();
    }
  };

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
      code: values.code,
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
          "Revisá el código e intentá nuevamente.",
        );
      });
  };

  const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    void handleSubmit(handleVerify, () => inputs.current[0]?.focus())(event);
  };

  const setInputRef = (index: number, element: HTMLInputElement | null) => {
    inputs.current[index] = element;
  };

  const countdown = `00:${String(remaining).padStart(2, "0")}`;
  const resendLabel = isResending
    ? "Reenviando..."
    : `Reenviar código${remaining > 0 ? ` (${countdown})` : ""}`;

  return {
    digits,
    codeError: errors.code?.message,
    hasEmail: Boolean(email),
    isVerifying,
    isResendDisabled: remaining > 0 || isResending,
    resendLabel,
    updateDigits,
    setInputRef,
    handlePaste,
    handleKeyDown,
    handleFormSubmit,
    handleResend,
  };
}
