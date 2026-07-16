import type {
  AnimalAge,
  AnimalColor,
  AnimalGender,
  AnimalPostType,
  AnimalSize,
  AnimalType,
} from '../requests/animalPostRequests'

export interface AnimalPostResponse {
  id: string
  type: AnimalPostType
  title: string
  description: string
  imageUrl: string
  animal: {
    id: string
    type: AnimalType
    size: AnimalSize
    gender: AnimalGender
    color: AnimalColor | null
    breed: string | null
    fur: string | null
    age: AnimalAge
    description: string | null
  }
  location: {
    id: string
    name: string
    address: string
    number: number
    latitude: number
    longitude: number
  }
  status: string
  createdAt: string
  ownerId: string
  phoneNumber: string
  reward: number | null
}
