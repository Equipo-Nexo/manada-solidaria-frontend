import * as yup from 'yup'
import { optionalContactPhoneSchema } from '@/common/app/schemas/phoneNumber.schema'

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('Ingresá tu nombre de usuario.')
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres.')
    .max(50, 'El nombre de usuario no puede superar los 50 caracteres.'),
  email: yup
    .string()
    .trim()
    .required('Ingresá tu correo electrónico.')
    .email('Ingresá un correo electrónico válido.')
    .max(120, 'El correo electrónico no puede superar los 120 caracteres.'),
  phone: optionalContactPhoneSchema,
  password: yup
    .string()
    .required('Ingresá tu contraseña.')
    .min(4, 'La contraseña debe tener al menos 4 caracteres.')
    .max(72, 'La contraseña no puede superar los 72 caracteres.'),
  confirmPassword: yup
    .string()
    .required('Repetí tu contraseña.')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden.'),
  isRescuer: yup.boolean().default(false),
  wantsTransporter: yup.boolean().default(false),
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>
