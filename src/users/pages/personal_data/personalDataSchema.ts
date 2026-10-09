import * as yup from 'yup'

import { registerSchema } from '@/auth/app/schemas/registerSchema'

export const personalDataSchema = registerSchema
  .pick(['username', 'email', 'phoneNumber'])
  .shape({
    name: yup.string().trim().max(50, 'El nombre no puede superar los 50 caracteres.').default('').defined(),
    lastname: yup.string().trim().max(50, 'El apellido no puede superar los 50 caracteres.').default('').defined(),
  })

export type PersonalDataFormValues = yup.InferType<typeof personalDataSchema>
