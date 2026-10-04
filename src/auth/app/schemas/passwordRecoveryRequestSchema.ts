import * as yup from 'yup'

export const passwordRecoveryRequestSchema = yup.object({
  email: yup.string().trim().required('Ingresá tu correo electrónico').email('Ingresá un correo electrónico válido'),
})

export type PasswordRecoveryRequestValues = yup.InferType<typeof passwordRecoveryRequestSchema>
