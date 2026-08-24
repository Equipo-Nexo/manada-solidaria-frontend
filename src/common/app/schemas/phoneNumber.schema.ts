import * as yup from 'yup'

export const phoneAreaCodeSchema = yup
  .string()
  .defined()
  .default('')
  .matches(/^\d{2,4}$/, {
    message: 'El código de área debe tener entre 2 y 4 números.',
    excludeEmptyString: true,
  })

export const phoneNumberSchema = yup
  .string()
  .defined()
  .default('')
  .matches(/^\d{6,7}$/, {
    message: 'El número de teléfono debe tener entre 6 y 7 números.',
    excludeEmptyString: true,
  })

export const optionalContactPhoneSchema = yup
  .string()
  .trim()
  .default('')
  .max(30, 'El número de teléfono no puede superar los 30 caracteres.')
  .notRequired()
