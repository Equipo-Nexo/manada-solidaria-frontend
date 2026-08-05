import { publishFundraisingSchema } from "@/fundraisings/app/schemas/PublishFundraising.schema";
import * as yup from "yup";

export const editFundraisingSchema = publishFundraisingSchema.shape({
  collectedAmount: yup
    .number()
    .notRequired()
    .typeError("Ingresá un monto.")
    .positive("El monto recaudado debe ser mayor a 0."),
})