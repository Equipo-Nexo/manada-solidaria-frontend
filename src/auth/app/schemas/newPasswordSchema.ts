import * as yup from "yup";

export const passwordRequirements = [
  {
    key: "length",
    label: "Mínimo 8 caracteres.",
    test: (value: string) => value.length >= 8,
  },
  {
    key: "uppercase",
    label: "Una letra mayúscula.",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    key: "lowercase",
    label: "Una letra minúscula.",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    key: "number",
    label: "Un número.",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    key: "special",
    label: "Un carácter especial.",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

export const newPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Ingresá tu nueva contraseña.")
    .max(72, "La contraseña no puede superar los 72 caracteres.")
    .test(
      "requirements",
      "La contraseña debe cumplir todos los requisitos.",
      (value) =>
        !value ||
        passwordRequirements.every((requirement) => requirement.test(value)),
    ),
  confirmPassword: yup
    .string()
    .required("Repetí tu nueva contraseña.")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden."),
});

export type NewPasswordValues = yup.InferType<typeof newPasswordSchema>;
