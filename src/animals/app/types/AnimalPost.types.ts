import { ANIMAL_POST_STATUS_LABELS } from "@/animals/utils/AnimalFormUtils"
import type { Location } from "@/common/app/services/responses/Location"




export const getAnimalPostStatus = (
  backendStatus: AnimalPostStatus
): string | undefined => {
    return ANIMAL_POST_STATUS_LABELS[backendStatus]
}




export type AnimalPostStatus = "CREATED" | "SEARCHING" | "FOUND" | "SEARCHING_ADOPT_AND_TRANSIT" | "SEARCHING_ADOPT" | "ADOPTED" | 'IN_STREET'
export type AnimalGender = 'MALE' | 'FEMALE'

export const animalTypes = [ 'DOG', 'CAT', 'OTHER'] as const
export type AnimalType = typeof animalTypes[number]



export const animalPostTypes = ['ADOPTION', 'LOST'] as const;
export type AnimalPostType = typeof animalPostTypes[number]

export const animalPostFilters = ['', 'IN_STREET', ...animalPostTypes]
export type AnimalPostFilter = typeof animalPostFilters[number]

export const animalSizes = [
  "SMALL",
  "MEDIUM",
  "LARGE",
] as const;

export type AnimalSize = typeof animalSizes[number];

export const animalSizeLabels: Record<AnimalSize, string> = {
  SMALL: "Pequeño",
  MEDIUM: "Mediano",
  LARGE: "Grande",
};


export const animalAges = [
  "PUPPY",
  "ADULT",
  "SENIOR",
  "UNKNOWN",
] as const;

export type AnimalAge = typeof animalAges[number];

export const animalAgeLabels: Record<AnimalAge, string> = {
  PUPPY: "Cachorro",
  ADULT: "Adulto",
  SENIOR: "Adulto mayor",
  UNKNOWN: "Desconocida",
};


export const animalSexes = [
  "MALE",
  "FEMALE",
  "UNKNOWN",
] as const;

export type AnimalSex = typeof animalSexes[number];

export const animalSexLabels: Record<AnimalSex, string> = {
  MALE: "Macho",
  FEMALE: "Hembra",
  UNKNOWN: "Desconocido",
};


export const animalColors = [
  "GRAY",
  "BLACK",
  "BLONDE",
  "BROWN",
  "WHITE",
  "OTHER",
] as const;

export type AnimalColor = typeof animalColors[number];

export const animalColorLabels: Record<AnimalColor, string> = {
  GRAY: "Gris",
  BLACK: "Negro",
  BLONDE: "Dorado",
  BROWN: "Marrón",
  WHITE: "Blanco",
  OTHER: "Otro",
};

export type AnimalPost = {
  id: string
  type: AnimalPostType
  name: string | null
  description: string
  imageUrl: string
  animal: Animal
  location: Location
  status: AnimalPostStatus
  createdAt: string
  ownerId: string
  phoneNumber: string | null
  reward: number | null
}

export type Animal = {
  id: string
  type: AnimalType
  size: AnimalSize
  gender: AnimalSex
  color: AnimalColor | null
  age: AnimalAge
}