import * as yup from 'yup'

import { registerSchema } from '@/auth/app/schemas/registerSchema'

export const personalDataSchema = registerSchema
  .pick(['username', 'email', 'phone'])
  .shape({
    name: yup.string().trim().max(50, 'El nombre no puede superar los 50 caracteres.').default('').defined(),
    lastname: yup.string().trim().max(50, 'El apellido no puede superar los 50 caracteres.').default('').defined(),
    phone: yup
      .string()
      .trim()
      .matches(/^\+?[1-9]\d{7,14}$/, {
        message: 'Ingresá un teléfono válido de entre 8 y 15 dígitos.',
        excludeEmptyString: true,
      })
      .default('')
      .defined(),
  })

export type PersonalDataFormValues = yup.InferType<typeof personalDataSchema>
