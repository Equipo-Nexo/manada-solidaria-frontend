import * as yup from "yup";
import type { ObjectSchema } from "yup";
import type { Location } from "@services/responses/Location";

export const locationSchema: ObjectSchema<Location> = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  number: yup.number().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});