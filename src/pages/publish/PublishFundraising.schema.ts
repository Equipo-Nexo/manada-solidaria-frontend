import * as yup from "yup";

export const publishFundraisingSchema = yup.object({
  title: yup.string().trim().required("Ingresá un título."),

  accountAlias: yup
    .string()
    .trim()
    .required("Ingresá un alias.")
    .min(6, "El alias debe tener entre 6 y 20 caracteres.")
    .max(20, "El alias debe tener entre 6 y 20 caracteres."),

  amountToBeCollected: yup
    .number()
    .typeError("Ingresá un monto.")
    .positive("La meta debe ser mayor a 0.")
    .required("Ingresá una meta de recaudación."),

  endDate: yup
    .string()
    .test(
      "not-before-today",
      "La fecha de fin no puede ser anterior a hoy.",
      (value) => {
        if (!value) return true;

        const today = new Date().toISOString().split("T")[0];

        return value >= today;
      },
    ),

  description: yup.string().trim().required("Ingresá una descripción."),

  phoneAreaCode: yup.string().required("Ingresá el código de área."),

  phone: yup.string().required("Ingresá un número de teléfono."),

  location: yup.string(),
});
