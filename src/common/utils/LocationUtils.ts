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

export const getAddress = ({ street, houseNumber, district }: Location) => {
  const hasAddress = !!street?.trim() && houseNumber != null;
  
  if (hasAddress) return `${street} ${houseNumber}`
  if (district) return district
}


export const getLocationErrorMessage = (
  errors?: FieldErrors<Location>,
): string | undefined => {
  if (!errors) return undefined;

  const fieldErrors = Object.values(errors).filter(
    (error) => error?.message,
  );

  if (fieldErrors.length === 0) return undefined;

  if (fieldErrors.length === 1) {
    return String(fieldErrors[0].message);
  }

  return 'Seleccioná una ubicación válida de las sugerencias para continuar.';
};