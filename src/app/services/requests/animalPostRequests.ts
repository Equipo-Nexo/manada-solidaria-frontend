import type { AnimalColor, AnimalSex, AnimalPostType } from "../../types/AnimalPost.types"

export type AnimalPostBackendStatus =
  | 'CREATED'
  | 'SEARCHING_ADOPT_AND_TRANSIT'
  | 'SEARCHING_ADOPT'

export type AnimalType = 'DOG' | 'CAT' | 'OTHER'
export type AnimalSize = 'SMALL' | 'MEDIUM' | 'LARGE'
export type AnimalGender = 'MALE' | 'FEMALE'
export type AnimalAge = 'PUPPY' | 'ADULT' | 'SENIOR' | 'UNKNOWN'

export type AnimalPost = {
  id: string
  type: AnimalPostType
  name: string | null
  description: string
  imageUrl: string
  animal: {
    id: string
    type: AnimalType
    size: AnimalSize
    gender: AnimalGender
    color: string | null
    age: AnimalAge
  }
  location: {
    id: string
    name: string
    address: string
    number: number
    latitude: number
    longitude: number
  }
  status: AnimalPostBackendStatus
  createdAt: string
  ownerId: string
  phoneNumber: string | null
  reward: number | null
}

type SortMetadata = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type AnimalPostsPage = {
  content: AnimalPost[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: SortMetadata
    unpaged: boolean
  }
  size: number
  sort: SortMetadata
  totalElements: number
  totalPages: number
}

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
