import * as yup from 'yup'
import {
  AnimalAge,
  AnimalColor,
  AnimalSex,
  AnimalSize,
  AnimalType,
  PublicationReason,
} from './utils/Enums.types'

export const newAnimalPostSchema = yup.object({
  photo: yup.mixed<File>().nullable().defined().default(null),
  publicationReason: yup
    .mixed<PublicationReason>()
    .oneOf(Object.values(PublicationReason))
    .required('Seleccioná un motivo de publicación.'),
  animalType: yup
    .mixed<AnimalType>()
    .oneOf(Object.values(AnimalType))
    .required('Seleccioná el tipo de animal.'),
  name: yup.string().trim().max(30, 'El nombre no puede superar los 30 caracteres.').default(''),
  animalSex: yup
    .mixed<AnimalSex>()
    .oneOf(Object.values(AnimalSex))
    .required('Seleccioná el sexo del animal.'),
  animalAge: yup
    .mixed<AnimalAge>()
    .oneOf(Object.values(AnimalAge))
    .required('Seleccioná la edad del animal.'),
  animalSize: yup
    .mixed<AnimalSize>()
    .oneOf(Object.values(AnimalSize))
    .required('Seleccioná el tamaño del animal.'),
  color: yup
    .mixed<AnimalColor>()
    .oneOf(Object.values(AnimalColor))
    .nullable()
    .defined()
    .default(null),
  areaCode: yup
    .string()
    .required('Ingresá la característica telefónica.')
    .matches(/^\d+$/, 'La característica debe contener solo números.'),
  phoneNumber: yup
    .string()
    .required('Ingresá el número de teléfono.')
    .matches(/^\d{7}$/, 'El número de teléfono debe tener exactamente 7 números.'),
  story: yup.string().trim().required('Contanos la historia del animal.'),
  needsTransport: yup.boolean().default(false),
  offersReward: yup.boolean().default(false),
  rewardAmount: yup.string().defined().default('').when(['publicationReason', 'offersReward'], {
    is: (publicationReason: PublicationReason, offersReward: boolean) =>
      publicationReason === PublicationReason.Lost && offersReward,
    then: (schema) => schema
      .required('Ingresá el monto de la recompensa.')
      .matches(/^\d+(?:[.,]\d{1,2})?$/, 'Ingresá un monto válido.')
      .test('positive-reward', 'El monto debe ser mayor a cero.', (value) =>
        value ? Number(value.replace(',', '.')) > 0 : false),
    otherwise: (schema) => schema.default(''),
  }),
})

export type NewAnimalPostFormValues = yup.InferType<typeof newAnimalPostSchema>
