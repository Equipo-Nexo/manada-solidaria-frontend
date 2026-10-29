import * as yup from "yup";
import type { ObjectSchema } from "yup";
import type { Location } from "@services/responses/Location";
import type { FieldErrors } from "react-hook-form";

export const locationSchema: ObjectSchema<Location> = yup.object({
  country: yup.string().required("Debe ingresar el país."),
  city: yup.string().required("Debe ingresar la ciudad."),
  formatted: yup.string().required(),
  district: yup.string().optional(),
  street: yup.string().optional(),
  houseNumber: yup.number().optional(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export const getAddress = (location: Location) => {
  const { street, houseNumber, district, city, country } = location
  const hasAddress = !!street?.trim() && houseNumber != null;
  
  if (hasAddress) return `${street} ${houseNumber}`
  if (district) return `${district}, ${city}`
  return `${city}, ${country}`
}


export const getLocationErrorMessage = (
  errors?: FieldErrors<Location>,
): string | undefined => {
  if (!errors) return undefined;

  const fieldErrors = Object.values(errors).filter(
    (error) => error?.message,
  );

  if (fieldErrors.length === 0) return undefined;

  return String(fieldErrors[0].message);
};