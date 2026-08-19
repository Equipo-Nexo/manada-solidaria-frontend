import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber"
import type { Animal, AnimalAge, AnimalColor, AnimalPostFilter, AnimalPostStatus, AnimalPostType, AnimalSex, AnimalSize, AnimalType } from "@animals/app/types/AnimalPost.types"
import type { Location } from "@services/responses/Location"

export type GetAnimalPostsRequest = {
  status?: AnimalPostStatus
  type?: AnimalPostFilter
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

interface AnimalRequest {
  type: AnimalType
  size: AnimalSize
  gender: AnimalSex
  color: AnimalColor | null
  age: AnimalAge
}


export interface BaseAnimalPostRequest {
  name: string
  description: string
  imageId: string
  animal: AnimalRequest
  location: Location
  phoneNumber?: PhoneNumber
}

export interface CreateAnimalPostRequest extends BaseAnimalPostRequest {
  type: AnimalPostType
}

export interface CreateAdoptionAnimalPostRequest extends CreateAnimalPostRequest {
  type: 'ADOPTION'
  inTransit: boolean
}

export interface CreateLostAnimalPostRequest extends CreateAnimalPostRequest {
  type: 'LOST'
  hasOwner: boolean
  reward?: number  
}

export type EditAnimalPostRequest = {
  name: string | null
  description: string
  imageId: string
  animal: Animal
  location: Location
  phoneNumber?: PhoneNumber
  reward: number | null
}

export type EditAnimalPostMutationRequest = {
  postId: string
  body: EditAnimalPostRequest
}

