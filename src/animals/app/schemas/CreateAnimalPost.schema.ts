import * as yup from 'yup'
import {
  animalAges,
  animalColors,
  animalSexes,
  animalSizes,
  animalTypes,
  type AnimalAge,
  type AnimalColor,
  type AnimalSex,
  type AnimalSize,
  type AnimalType,
} from '@/animals/app/types/AnimalPost.types'
import { PublicationReason } from '@/animals/utils/CreateAnimalPostRequestBuilder'
import { parseRewardAmount } from '@utils/rewardAmount'
import type { GeolocationResponse } from '@/common/app/services/responses/Location'
import { phoneAreaCodeSchema, phoneNumberSchema } from '@/common/app/schemas/phoneNumber.schema'

export const newAnimalPostSchema = yup.object({
  imageId: yup.string().required('Seleccioná una foto del animal.'),
  publicationReason: yup
    .mixed<PublicationReason>()
    .oneOf(Object.values(PublicationReason))
    .required('Seleccioná un motivo de publicación.'),
  location: yup
    .mixed<GeolocationResponse>()
    .required('Seleccioná la ubicación del animal.'),
  animalType: yup
    .mixed<AnimalType>()
    .oneOf(animalTypes)
    .required('Seleccioná el tipo de animal.'),
  name: yup.string().trim().max(30, 'El nombre no puede superar los 30 caracteres.').default(''),
  animalSex: yup
    .mixed<AnimalSex>()
    .oneOf(animalSexes)
    .required('Seleccioná el sexo del animal.'),
  animalAge: yup
    .mixed<AnimalAge>()
    .oneOf(animalAges)
    .required('Seleccioná la edad del animal.'),
  animalSize: yup
    .mixed<AnimalSize>()
    .oneOf(animalSizes)
    .required('Seleccioná el tamaño del animal.'),
  color: yup
    .mixed<AnimalColor>()
    .oneOf(animalColors)
    .nullable()
    .defined()
    .default(null),
  areaCode: phoneAreaCodeSchema
    .when('publicationReason', {
      is: PublicationReason.Street,
      then: (schema) => schema,
      otherwise: (schema) =>
        schema.required('Ingresá la característica telefónica.'),
    }),
  phoneNumber: phoneNumberSchema
    .when('publicationReason', {
      is: PublicationReason.Street,
      then: (schema) => schema,
      otherwise: (schema) =>
        schema.required('Ingresá el número de teléfono.'),
    }),
  story: yup.string().trim().required('Contanos la historia del animal.'),
  needsTransport: yup.boolean().default(false),
  offersReward: yup.boolean().default(false),
  rewardAmount: yup.string().defined().default('').when(['publicationReason', 'offersReward'], {
    is: (publicationReason: PublicationReason, offersReward: boolean) =>
      publicationReason === PublicationReason.Lost && offersReward,
    then: (schema) => schema
      .required('Ingresá el monto de la recompensa.')
      .matches(/^\d{1,3}(?:\.\d{3})*(?:,\d{1,2})?$/, 'Ingresá un monto válido.')
      .test('positive-reward', 'El monto debe ser mayor a cero.', (value) =>
        value ? parseRewardAmount(value) > 0 : false),
    otherwise: (schema) => schema.default(''),
  }),
})

export type NewAnimalPostFormValues = yup.InferType<typeof newAnimalPostSchema>
