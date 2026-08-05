import * as yup from "yup";
import { locationSchema } from "../../utils/Location.schema";

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
    .notRequired()
    .typeError("Ingresá un monto.")
    .positive("La meta debe ser mayor a 0."),
  endDate: yup
    .string()
    .notRequired()
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
  imageId: yup.string().notRequired(),
  location: locationSchema,
});
