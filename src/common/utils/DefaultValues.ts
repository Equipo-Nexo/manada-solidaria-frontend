import type { DefaultValues } from 'react-hook-form'
import type { NewAnimalPostFormValues } from '../../animals/app/schemas/CreateAnimalPost.schema'
import type { Location } from '../app/services/responses/Location'

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

export const DEFAULT_LOCATION: Location = {
  name: 'Parque Centenario',
  address: 'Av. Patricias',
  number: 100,
  latitude: -34.6,
  longitude: -58.4,
}