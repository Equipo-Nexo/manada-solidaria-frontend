import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('Ingresá tu usuario.')
    .min(3, 'El usuario debe tener al menos 3 caracteres.')
    .max(50, 'El usuario no puede superar los 50 caracteres.'),
  password: yup
    .string()
    .required('Ingresá tu contraseña.')
    .min(4, 'La contraseña debe tener al menos 6 caracteres.')
    .max(72, 'La contraseña no puede superar los 72 caracteres.'),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>
