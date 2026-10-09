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

export const optionalPhoneNumberSchema = yup
  .object({
    areaCode: phoneAreaCodeSchema,
    number: phoneNumberSchema,
  })
  .test('complete-phone-number', function (value) {
    if (value?.number && !value.areaCode) {
      return this.createError({
        path: `${this.path}.areaCode`,
        message: 'Ingresá el código de área.',
      })
    }

    if (value?.areaCode && !value.number) {
      return this.createError({
        path: `${this.path}.number`,
        message: 'Ingresá el número de teléfono.',
      })
    }

    return true
  })
