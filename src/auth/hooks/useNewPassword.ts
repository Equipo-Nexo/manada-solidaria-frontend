import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@hooks/toast/useToast";
import {
  newPasswordSchema,
  passwordRequirements,
  type NewPasswordValues,
} from "@auth/app/schemas/newPasswordSchema";
import { useResetPasswordMutation } from "../app/api/passwordRecoveryApi";
import { useLocation, useNavigate } from "react-router-dom";

export function useNewPassword() {
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const resetToken =
    typeof state?.resetToken === "string" ? state.resetToken : "";

  const [resetPassword] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordValues>({
    resolver: yupResolver(newPasswordSchema),
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });
  const password = useWatch({ control, name: "password" });
  const requirements = passwordRequirements.map(({ key, label, test }) => ({
    key,
    label,
    met: test(password),
  }));

  const handleResetPassword = (values: NewPasswordValues) => {
    if (!resetToken) {
      toast.error(
        "No pudimos actualizar la contraseña",
        "La solicitud de recuperación no es válida. Solicitá un nuevo código.",
      );
      return;
    }

    resetPassword({
      resetToken,
      newPassword: values.password,
      newPasswordVerification: values.confirmPassword,
    })
      .unwrap()
      .then(() => {
        toast.success(
          "Contraseña actualizada",
          "Ya podés iniciar sesión con tu nueva contraseña.",
        );

        navigate("/recuperar-contrasena/contrasena-actualizada", { replace: true });
      })
      .catch(() => {
        toast.error(
          "No pudimos actualizar la contraseña",
          "La solicitud puede haber vencido o la contraseña no cumple los requisitos.",
        );
      });
  };

  return {
    register,
    errors,
    requirements,
    showPassword,
    showConfirmation,
    togglePassword: () => setShowPassword((visible) => !visible),
    toggleConfirmation: () => setShowConfirmation((visible) => !visible),
    handleFormSubmit: handleSubmit(handleResetPassword),
  };
}
