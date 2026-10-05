import * as yup from 'yup'
import { optionalPhoneNumberSchema } from '@/common/app/schemas/phoneNumber.schema'

export const passwordRules = {
  minLength: 8,
  maxLength: 64,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  specialCharacter: /[^A-Za-z0-9]/,
} as const

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
  phoneNumber: optionalPhoneNumberSchema,
  password: yup
    .string()
    .required('Ingresá tu contraseña.')
    .min(passwordRules.minLength, 'La contraseña debe tener al menos 8 caracteres.')
    .max(passwordRules.maxLength, 'La contraseña no puede superar los 64 caracteres.')
    .matches(passwordRules.uppercase, 'La contraseña debe contener al menos una letra mayúscula.')
    .matches(passwordRules.lowercase, 'La contraseña debe contener al menos una letra minúscula.')
    .matches(passwordRules.number, 'La contraseña debe contener al menos un número.')
    .matches(passwordRules.specialCharacter, 'La contraseña debe contener al menos un carácter especial.'),
  confirmPassword: yup
    .string()
    .required('Repetí tu contraseña.')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden.'),
  isRescuer: yup.boolean().default(false),
  wantsTransporter: yup.boolean().default(false),
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>
