import * as yup from "yup";
import type { PublishCampaignCategory } from "./PublishCampaign";

export const publishCampaignSchema = yup.object({
  title: yup.string().required("Ingresá un título para la campaña.").max(100),
  imageId: yup.string().notRequired(),
  category: yup
    .mixed<PublishCampaignCategory>()
    .oneOf(["Donación", "Castración", "Vacunación", "Desparasitación", "Otro"])
    .required("Seleccioná una categoría"),

  description: yup.string().required("Ingresá una descripción.").max(200),

  startDate: yup.string().when("category", {
    is: (category: string) => category !== "Donación",
    then: (schema) =>
      schema
        .required("Seleccioná una fecha de inicio.")
        .test(
          "not-before-today",
          "La fecha de inicio no puede ser anterior a hoy.",
          (value) => {
            if (!value) return true;
            const today = new Date().toISOString().split("T")[0];
            return value >= today;
          },
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  endDate: yup.string().when("category", {
    is: (category: string) => category !== "Donación",
    then: (schema) =>
      schema
        .required("Seleccioná una fecha de fin.")
        .test(
          "not-before-today",
          "La fecha de fin no puede ser anterior a hoy.",
          (value) => {
            if (!value) return true;
            const today = new Date().toISOString().split("T")[0];
            return value >= today;
          },
        )
        .test(
          "not-before-start-date",
          "La fecha de fin debe ser mayor o igual a la fecha de inicio.",
          function (endDate) {
            const { startDate } = this.parent;

            if (!startDate || !endDate) return true;

            return endDate >= startDate;
          },
        ),
    otherwise: (schema) => schema.notRequired(),
  }),

  startTime: yup.string().when("category", {
    is: (category: string) => category !== "Donación",
    then: (schema) => schema.required("Ingresá una hora de inicio."),
    otherwise: (schema) => schema.notRequired(),
  }),

  endTime: yup.string().when("category", {
    is: (category: string) => category !== "Donación",
    then: (schema) => schema.required("Ingresá una hora de fin."),
    otherwise: (schema) => schema.notRequired(),
  }),
  phoneAreaCode: yup.string().required("Ingresá un código de área."),
  phone: yup.string().required("Ingresá un número de teléfono."),

  location: yup.string().required("Ingresá una ubicación."),
  donationNeeds: yup.array().when("category", {
    is: "Donación",
    then: (schema) =>
      schema.min(1, "Seleccioná al menos un elemento para recolectar."),
    otherwise: (schema) => schema.notRequired(),
  }),
});
