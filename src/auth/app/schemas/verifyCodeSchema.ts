import * as yup from "yup";

export const verifyCodeSchema = yup.object({
  code: yup
    .array()
    .of(yup.string().defined())
    .test(
      "complete-code",
      "Ingresá los 6 dígitos del código",
      (value) =>
        value?.length === 6 && value.every((digit) => /^\d$/.test(digit)),
    )
    .required("Ingresá el código de verificación"),
});

export type VerifyCodeValues = yup.InferType<typeof verifyCodeSchema>;
