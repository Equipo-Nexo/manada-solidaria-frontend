import * as yup from "yup";
import type { ObjectSchema } from "yup";
import type { Location } from "../app/services/responses/Location";

export const locationSchema: ObjectSchema<Location> = yup.object({
  id: yup.string().required(),
  name: yup.string().required("Seleccioná una ubicación."),
  address: yup.string().required("Ingresá una dirección."),
  number: yup.number().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});