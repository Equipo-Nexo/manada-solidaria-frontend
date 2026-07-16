import type { DefaultValues } from 'react-hook-form'
import type { NewAnimalPostFormValues } from '../Form.schema'

export const newAnimalPostDefaultValues: DefaultValues<NewAnimalPostFormValues> = {
  photo: null,
  publicationReason: undefined,
  animalType: undefined,
  animalSex: undefined,
  animalAge: undefined,
  animalSize: undefined,
  color: null,
  name: '',
  areaCode: '',
  phoneNumber: '',
  story: '',
  needsTransport: false,
  offersReward: false,
  rewardAmount: '',
}
