import * as yup from "yup";
import type { ObjectSchema } from "yup";
import type { Location } from "@services/responses/Location";

export const locationSchema: ObjectSchema<Location> = yup.object({
  country: yup.string().required(),
  city: yup.string().required(),
  formatted: yup.string().required(),
  district: yup.string().optional(),
  street: yup.string().optional(),
  houseNumber: yup.number().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export const getAddress = ({ street, houseNumber }: Location) => {
  if(street && houseNumber) return `${street} ${houseNumber}`
}