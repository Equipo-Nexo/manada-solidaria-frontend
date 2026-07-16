export type AnimalPostType = 'ADOPTION' | 'LOST' | 'STREET' | 'FOSTER'
export type AnimalType = 'DOG' | 'CAT' | 'OTHER'
export type AnimalSize = 'SMALL' | 'MEDIUM' | 'LARGE'
export type AnimalGender = 'MALE' | 'FEMALE' | 'UNKNOWN'
export type AnimalAge = 'PUPPY' | 'ADULT' | 'SENIOR' | 'UNKNOWN'
export type AnimalColor = 'GRAY' | 'BLACK' | 'BLONDE' | 'BROWN' | 'WHITE' | 'OTHER'

export interface AnimalPostLocationRequest {
  name: string
  address: string
  number: number
  latitude: number
  longitude: number
}

export interface CreateAnimalPostRequest {
  type: AnimalPostType
  title: string
  description: string
  imageId: string
  animal: {
    type: AnimalType
    size: AnimalSize
    gender: AnimalGender
    age: AnimalAge
    color: AnimalColor | null
  }
  location: AnimalPostLocationRequest
  phoneNumber: string
  inTransit: boolean
  reward?: number
}
