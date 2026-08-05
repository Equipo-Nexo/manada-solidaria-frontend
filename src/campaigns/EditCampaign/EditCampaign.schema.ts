import * as yup from 'yup'
import type { CampaignDetailsType } from '@models/Campaign.types'
import { locationSchema } from '@utils/Location.schema'

export const editCampaignSchema = yup.object({
  campaignType: yup
    .mixed<CampaignDetailsType>()
    .oneOf(['donation', 'castration', 'vaccination', 'deworming', 'other'])
    .required(),
  title: yup
    .string()
    .trim()
    .required('Ingresá un título para la campaña.')
    .max(100, 'El título no puede superar los 100 caracteres.'),
  description: yup
    .string()
    .trim()
    .required('Ingresá una descripción.')
    .max(200, 'La descripción no puede superar los 200 caracteres.'),
  startDate: yup.string().defined().default('').when('campaignType', {
    is: (type: CampaignDetailsType) => type !== 'donation',
    then: (schema) => schema.required('Seleccioná una fecha de inicio.'),
  }),
  endDate: yup
    .string()
    .defined()
    .default('')
    .when('campaignType', {
      is: (type: CampaignDetailsType) => type !== 'donation',
      then: (schema) => schema.required('Seleccioná una fecha de fin.'),
    })
    .test(
      'not-before-start-date',
      'La fecha de fin debe ser mayor o igual a la fecha de inicio.',
      function (endDate) {
        const { campaignType, startDate } = this.parent
        if (campaignType === 'donation' || !startDate || !endDate) return true
        return endDate >= startDate
      },
    ),
  startTime: yup.string().defined().default('').when('campaignType', {
    is: (type: CampaignDetailsType) => type !== 'donation',
    then: (schema) => schema.required('Ingresá una hora de inicio.'),
  }),
  endTime: yup.string().defined().default('').when('campaignType', {
    is: (type: CampaignDetailsType) => type !== 'donation',
    then: (schema) => schema.required('Ingresá una hora de fin.'),
  }),
  phoneAreaCode: yup
    .string()
    .required('Ingresá un código de área.')
    .matches(/^\d+$/, 'El código de área debe contener solo números.'),
  phone: yup
    .string()
    .required('Ingresá un número de teléfono.')
    .matches(/^\d{7}$/, 'El número de teléfono debe tener exactamente 7 números.'),
  location: locationSchema.nullable(),
  imageId: yup.string().defined().default(''),
})

export type EditCampaignFormValues = yup.InferType<typeof editCampaignSchema>
