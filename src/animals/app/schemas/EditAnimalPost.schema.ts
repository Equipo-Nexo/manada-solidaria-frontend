import * as yup from 'yup'
import {
  animalAges,
  animalColors,
  animalSexes,
  animalSizes,
  type AnimalAge,
  type AnimalColor,
  type AnimalSex,
  type AnimalSize,
} from '@/animals/app/types/AnimalPost.types'
import { PublicationReason } from '@/animals/utils/CreateAnimalPostRequestBuilder'
import { locationSchema } from '@utils/Location.schema'

export const editAnimalPostSchema = yup.object({
    publicationReason: yup
        .mixed<PublicationReason>()
        .oneOf(Object.values(PublicationReason))
        .required(),
    imageId: yup.string().required('Seleccioná una foto del animal.'),
    location: locationSchema,
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
    areaCode: yup
        .string()
        .defined()
        .default('')
        .when('publicationReason', {
            is: PublicationReason.Street,
            then: (schema) =>
                schema.matches(/^\d*$/, 'La característica debe contener solo números.'),
            otherwise: (schema) =>
                schema
                    .required('Ingresá la característica telefónica.')
                    .matches(/^\d+$/, 'La característica debe contener solo números.'),
        }),
    phoneNumber: yup
        .string()
        .defined()
        .default('')
        .when('publicationReason', {
            is: PublicationReason.Street,
            then: (schema) =>
                schema.matches(
                    /^(?:\d{7})?$/,
                    'El número de teléfono debe tener exactamente 7 números.',
                ),
            otherwise: (schema) =>
                schema
                    .required('Ingresá el número de teléfono.')
                    .matches(/^\d{7}$/, 'El número de teléfono debe tener exactamente 7 números.'),
        }),
    story: yup.string().trim().required('Contanos la historia del animal.'),
})

export type EditAnimalPostFormValues = yup.InferType<typeof editAnimalPostSchema>
