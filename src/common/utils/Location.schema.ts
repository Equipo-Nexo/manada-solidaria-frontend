import * as yup from "yup";
import type { ObjectSchema } from "yup";
import type { Location } from "@services/responses/Location";

export const locationSchema: ObjectSchema<Location> = yup.object({
  name: yup.string().notRequired(),
  address: yup.string().notRequired(),
  number: yup.number().notRequired(),
  latitude: yup.number().notRequired(),
  longitude: yup.number().notRequired(),
});