import * as yup from "yup";
import { campaignCategories, type CampaignCategory } from "../types/Campaign.types";
import { locationSchema } from "@/common/utils/Location.schema";
import { phoneAreaCodeSchema, phoneNumberSchema } from "@/common/app/schemas/phoneNumber.schema";

export const publishCampaignSchema = yup.object({
  title: yup.string().required("Ingresá un título para la campaña.").max(100),
  imageId: yup.string().notRequired(),
  category: yup
    .mixed<CampaignCategory>()
    .oneOf(campaignCategories)
    .required("Seleccioná una categoría"),

  description: yup.string().required("Ingresá una descripción.").max(200),

  startDate: yup.string().when("category", {
    is: (category: string) => category !== "DONATION",
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
    is: (category: string) => category !== "DONATION",
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
    is: (category: string) => category !== "DONATION",
    then: (schema) => schema.required("Ingresá una hora de inicio."),
    otherwise: (schema) => schema.notRequired(),
  }),

  endTime: yup.string().when("category", {
    is: (category: string) => category !== "DONATION",
    then: (schema) => schema.required("Ingresá una hora de fin."),
    otherwise: (schema) => schema.notRequired(),
  }),
  phoneAreaCode: phoneAreaCodeSchema.required("Ingresá un código de área."),
  phone: phoneNumberSchema.required("Ingresá un número de teléfono."),

  location: locationSchema,
  donationNeeds: yup.array().when("category", {
    is: "DONATION",
    then: (schema) =>
      schema.min(1, "Seleccioná al menos un elemento para recolectar."),
    otherwise: (schema) => schema.notRequired(),
  }),
  accountAlias: yup.string().when("category", {
    is: 'FUNDRAISING',
    then: (schema) => schema.required().min(6).max(24),
    otherwise: (schema) => schema.notRequired()
  }),
  amountToBeCollected: yup.number().notRequired()
});

export type PublishCampaignForm = yup.InferType<typeof publishCampaignSchema>
