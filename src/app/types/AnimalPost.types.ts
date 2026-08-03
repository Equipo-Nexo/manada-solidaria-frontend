export enum AnimalPostType {
  Adoption = 'ADOPTION',
  Lost = 'LOST',
  InStreet = 'IN_STREET',
}

export const ANIMAL_POST_STATUS_LABELS = {
  ADOPTION: 'En adopción',
  LOST: 'Perdido',
  IN_STREET: 'En la calle',
  CREATED: undefined,
  SEARCHING: 'Perdido',
  FOUND: 'Encontrado',
  SEARCHING_ADOPT_AND_TRANSIT: 'En adopción',
  SEARCHING_ADOPT: 'En tránsito',
  ADOPTED: 'Adoptado',
} as const

export type AnimalPostCategory = '' | AnimalPostType

export const ANIMAL_POST_CATEGORIES = [
  '',
  ...Object.values(AnimalPostType),
] as AnimalPostCategory[]

export const ANIMAL_POST_CATEGORY_LABELS: Record<AnimalPostCategory, string> = {
  '': 'Todos',
  [AnimalPostType.Adoption]: ANIMAL_POST_STATUS_LABELS.ADOPTION,
  [AnimalPostType.Lost]: `${ANIMAL_POST_STATUS_LABELS.LOST}s`,
  [AnimalPostType.InStreet]: ANIMAL_POST_STATUS_LABELS.IN_STREET,
}

type AnimalPostCode = keyof typeof ANIMAL_POST_STATUS_LABELS
export type AnimalPostBackendStatus = Exclude<AnimalPostCode, `${AnimalPostType}`>
export type AnimalPostStatus = Exclude<
  (typeof ANIMAL_POST_STATUS_LABELS)[AnimalPostCode],
  undefined
>

export const getAnimalPostStatus = (
  type?: AnimalPostType,
  backendStatus?: AnimalPostBackendStatus,
): AnimalPostStatus | undefined => {
  if (type === AnimalPostType.InStreet) return ANIMAL_POST_STATUS_LABELS.IN_STREET
  if (type === AnimalPostType.Lost) return ANIMAL_POST_STATUS_LABELS.LOST

  if (type === AnimalPostType.Adoption) {
    return backendStatus === 'SEARCHING_ADOPT_AND_TRANSIT'
      ? ANIMAL_POST_STATUS_LABELS.ADOPTION
      : ANIMAL_POST_STATUS_LABELS.SEARCHING_ADOPT
  }

  return backendStatus ? ANIMAL_POST_STATUS_LABELS[backendStatus] : undefined
}

export enum AnimalType {
  Dog = 'DOG',
  Cat = 'CAT',
  Other = 'OTHER',
}

export enum AnimalSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

export enum AnimalSex {
  Male = 'MALE',
  Female = 'FEMALE',
  Unknown = 'UNKNOWN',
}

export enum AnimalAge {
  Puppy = 'PUPPY',
  Adult = 'ADULT',
  Senior = 'SENIOR',
  Unknown = 'UNKNOWN',
}

export enum AnimalColor {
  Gray = 'GRAY',
  Black = 'BLACK',
  Blonde = 'BLONDE',
  Brown = 'BROWN',
  White = 'WHITE',
  Other = 'OTHER',
}
