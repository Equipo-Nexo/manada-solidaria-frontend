import * as yup from 'yup'

export const verifyCodeSchema = yup.object({
  code: yup.string().required('Ingresá el código de verificación').matches(/^\d{6}$/, 'Ingresá los 6 dígitos del código'),
})
export type VerifyCodeValues = yup.InferType<typeof verifyCodeSchema>
