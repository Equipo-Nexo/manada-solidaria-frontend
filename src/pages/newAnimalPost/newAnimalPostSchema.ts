import * as yup from 'yup'

export const newAnimalPostSchema = yup.object({
  photo: yup.mixed<File>().required('Seleccioná una foto del animal.'),
  publicationReason: yup
    .mixed<'ADOPTION' | 'LOST' | 'STREET' | 'FOSTER'>()
    .oneOf(['ADOPTION', 'LOST', 'STREET', 'FOSTER'])
    .required('Seleccioná un motivo de publicación.'),
  animalType: yup
    .mixed<'DOG' | 'CAT' | 'OTHER'>()
    .oneOf(['DOG', 'CAT', 'OTHER'])
    .required('Seleccioná el tipo de animal.'),
  name: yup.string().trim().max(30, 'El nombre no puede superar los 30 caracteres.').default(''),
  animalSex: yup
    .mixed<'MALE' | 'FEMALE' | 'UNKNOWN'>()
    .oneOf(['MALE', 'FEMALE', 'UNKNOWN'])
    .required('Seleccioná el sexo del animal.'),
  animalAge: yup
    .mixed<'PUPPY' | 'ADULT' | 'SENIOR' | 'UNKNOWN'>()
    .oneOf(['PUPPY', 'ADULT', 'SENIOR', 'UNKNOWN'])
    .required('Seleccioná la edad del animal.'),
  animalSize: yup
    .mixed<'SMALL' | 'MEDIUM' | 'LARGE'>()
    .oneOf(['SMALL', 'MEDIUM', 'LARGE'])
    .required('Seleccioná el tamaño del animal.'),
  color: yup
    .mixed<'GRAY' | 'BLACK' | 'BLONDE' | 'BROWN' | 'WHITE' | 'OTHER'>()
    .oneOf(['GRAY', 'BLACK', 'BLONDE', 'BROWN', 'WHITE', 'OTHER'])
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
})

export type NewAnimalPostFormValues = yup.InferType<typeof newAnimalPostSchema>
