import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required('Ingresá tu usuario.')
    .min(3, 'Debe tener al menos 3 caracteres.')
    .max(50, 'No puede superar los 50 caracteres.'),
  password: yup
    .string()
    .required('Ingresá tu contraseña.')
    .min(4, 'Debe tener al menos 4 caracteres.')
    .max(72, 'No puede superar los 72 caracteres.'),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>
