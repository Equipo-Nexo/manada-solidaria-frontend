import type { DefaultValues } from 'react-hook-form'
import type { NewAnimalPostFormValues } from '../../animals/pages/animalPosts/newAnimalPost/Form.schema'

export const newAnimalPostDefaultValues: DefaultValues<NewAnimalPostFormValues> = {
  imageId: undefined,
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
