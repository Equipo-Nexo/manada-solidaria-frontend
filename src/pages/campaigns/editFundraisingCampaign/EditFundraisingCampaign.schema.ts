import * as yup from "yup";
import { publishFundraisingSchema } from "../../publish/PublishFundraising.schema";

export const editFundraisingSchema = publishFundraisingSchema.shape({
  collectedAmount: yup
    .number()
    .notRequired()
    .typeError("Ingresá un monto.")
    .positive("El monto recaudado debe ser mayor a 0."),
})