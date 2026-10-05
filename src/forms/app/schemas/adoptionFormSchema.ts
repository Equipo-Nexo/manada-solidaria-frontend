import * as yup from 'yup';
import { phoneAreaCodeSchema, phoneNumberSchema } from '@/common/app/schemas/phoneNumber.schema';
import type { AdoptionCategory } from '../types/AdoptionForm.types';

export function createAdoptionFormSchema(categories: AdoptionCategory[]) {
  const valueSchema = yup.string().trim().defined().default('');
  const answers: Record<string, typeof valueSchema> = {};

  for (const category of categories) {
    for (const question of category.questions) {
      answers[question.id] = question.type === 'SELECTION'
        ? valueSchema.oneOf(
            ['', ...question.details.map(({ description }) => description)],
            'Seleccioná una opción válida.',
          )
        : valueSchema;
    }
  }

  return yup.object({
    answers: yup.object().shape(answers).required(),
    adoptionReason: yup.string().trim().defined().default(''),
    phoneNumber: yup.object({
      areaCode: phoneAreaCodeSchema.required('Ingresá el código de área.'),
      number: phoneNumberSchema.required('Ingresá el número de teléfono.'),
    }).required(),
  });
}

export type AdoptionFormValues = yup.InferType<ReturnType<typeof createAdoptionFormSchema>>;
