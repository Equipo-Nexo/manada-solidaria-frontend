import type {
  AnimalAge,
  AnimalColor,
  AnimalPostType,
  AnimalSex,
  AnimalSize,
  AnimalType,
} from '../../../../animals/app/types/AnimalPost.types'
import type { Location } from '@services/responses/Location'

export interface AnimalPostResponse {
  id: string
  type: AnimalPostType
  name: string | null
  description: string
  imageUrl: string
  animal: {
    id: string
    type: AnimalType
    size: AnimalSize
    gender: AnimalSex
    color: AnimalColor | null
    breed: string | null
    fur: string | null
    age: AnimalAge
    description: string | null
  }
  location: Location
  status: string
  createdAt: string
  ownerId: string
  phoneNumber: string | null
  reward: number | null
}
