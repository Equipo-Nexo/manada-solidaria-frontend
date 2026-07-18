import {
  AnimalAge,
  AnimalColor,
  AnimalPostType,
  AnimalSex,
  AnimalSize,
  AnimalType,
} from '../../types/AnimalPost.types'

export interface AnimalPostLocationRequest {
  name: string
  address: string
  number: number
  latitude: number
  longitude: number
}

interface CreateAnimalPostBaseRequest {
  title: string
  description: string
  imageId: string
  animal: {
    type: AnimalType
    size: AnimalSize
    gender: AnimalSex
    age: AnimalAge
    color: AnimalColor | null
  }
  location: AnimalPostLocationRequest
  phoneNumber: string
  reward?: number
}

export type CreateAnimalPostRequest = CreateAnimalPostBaseRequest & (
  | {
      type: AnimalPostType.Lost
      hasOwner: boolean
      inTransit?: never
    }
  | {
      type: AnimalPostType.Adoption
      inTransit: boolean
      hasOwner?: never
    }
)
