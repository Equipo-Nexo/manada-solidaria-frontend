import type { Animal, AnimalPostBackendStatus, AnimalPostType } from "@animals/app/types/AnimalPost.types"
import type { Location } from "@services/responses/Location"

export type GetAnimalPostsRequest = {
  status?: AnimalPostBackendStatus
  type?: AnimalPostType
  page?: number
  size?: number
}

export interface AnimalPostLocationRequest {
  name: string
  address: string
  number: number
  latitude: number
  longitude: number
}

interface CreateAnimalPostBaseRequest {
  name: string
  description: string
  imageId: string
  animal: Animal
  location: AnimalPostLocationRequest
  phoneNumber: string
  reward?: number
}

export type CreateAnimalPostRequest = CreateAnimalPostBaseRequest & (
  | {
    type: 'LOST'
    hasOwner: true
    inTransit?: never
  }
  | {
    type: 'ADOPTION'
    inTransit: boolean
    hasOwner?: never
  }
  | {
    type: 'IN_STREET'
    hasOwner: false
    inTransit?: never
  }
)

export type EditAnimalPostRequest = {
  name: string | null
  description: string
  imageId: string
  animal: Animal
  location: Location
  phoneNumber: string | null
  reward: number | null
}

export type EditAnimalPostMutationRequest = {
  postId: string
  body: EditAnimalPostRequest
}

