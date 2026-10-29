import type { AnimalPostStatus } from '@animals/app/types/AnimalPost.types'
import { AnimalPostStatus as statusDetails } from '@utils/AnimalPostUtils'

export type AnimalStatusTarget = Exclude<AnimalPostStatus, 'CREATED' | 'SEARCHING' | 'TO_RESCUE'>

export type AnimalStatusOption = {
  value: AnimalStatusTarget
  label: string
  description: string
  finalAction?: string
}

const statusConfig: Record<AnimalStatusTarget, { description: string; finalAction?: string }> = {
  SEARCHING_ADOPT_AND_TRANSIT: { description: 'Busca familia o tránsito (hogar provisorio)' },
  SEARCHING_ADOPT: { description: 'Está bajo cuidado temporal y busca un hogar' },
  ADOPTED: { description: 'Encontró un hogar definitivo', finalAction: 'fue adoptado' },
  FOUND: { description: 'Se reencontró con su familia', finalAction: 'fue encontrado' },
  RESCUED: { description: 'Ya está a salvo', finalAction: 'fue rescatado' },
}

const transitions: Record<AnimalPostStatus, readonly AnimalStatusTarget[]> = {
  CREATED: [],
  TO_RESCUE: ['RESCUED'],
  SEARCHING: ['FOUND'],
  SEARCHING_ADOPT_AND_TRANSIT: ['SEARCHING_ADOPT', 'ADOPTED'],
  SEARCHING_ADOPT: ['SEARCHING_ADOPT_AND_TRANSIT', 'ADOPTED'],
  ADOPTED: [],
  FOUND: [],
  RESCUED: [],
}

function toOption(value: AnimalStatusTarget): AnimalStatusOption {
  const { description, finalAction } = statusConfig[value]
  return { value, label: statusDetails[value].text, description, finalAction }
}

export function getPossibleStatuses(currentStatus: string): AnimalStatusOption[] {
  if (!Object.hasOwn(transitions, currentStatus)) return []
  return transitions[currentStatus as AnimalPostStatus].map(toOption)
}
