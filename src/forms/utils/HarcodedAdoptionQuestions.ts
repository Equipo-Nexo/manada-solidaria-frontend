import type { AdoptionQuestion } from '../app/types/AdoptionForm.types';

export const AdoptionQuestionsMock: AdoptionQuestion[] = [
  {
    id: 'adoption-reason',
    type: 'TEXT',
    iconName: 'Heart',
    title: '¿Por qué querés adoptar?',
    placeHolder: 'Contanos tu historia...',
    details: [],
  },
  {
    id: 'adoption-contact',
    type: 'PHONE',
    iconName: 'Phone',
    title: 'Dejanos tu contacto',
    placeHolder: '4182076',
    details: [],
    required: true,
  },
];
