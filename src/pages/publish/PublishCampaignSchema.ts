import * as yup from "yup";

export const publishCampaignSchema = yup.object({
  title: yup.string().required("Ingresá un título para la campaña.").max(100),

  category: yup.string().required("Seleccioná una categoría."),

  description: yup.string().required("Ingresá una descripción.").max(200),

  startDate: yup.string().when("category", {
    is: (category: string) => category !== "Donación",
    then: (schema) => schema.required("Seleccioná una fecha de inicio."),
    otherwise: (schema) => schema.notRequired(),
  }),

  endDate: yup.string().when("category", {
    is: (category: string) => category !== "Donación",
    then: (schema) => schema.required("Seleccioná una fecha de fin."),
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
});
