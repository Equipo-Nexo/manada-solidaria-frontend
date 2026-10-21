import type { AnimalPostStatus } from '@animals/app/types/AnimalPost.types'
import { AnimalPostStatus as statusDetails } from '@utils/AnimalPostUtils'

export type AnimalStatusTarget = Exclude<AnimalPostStatus, 'CREATED' | 'SEARCHING' | 'TO_RESCUE'>

export type AnimalStatusOption = {
  value: AnimalStatusTarget
  label: string
  description: string
  finalAction?: string
}

const statusConfig: Record<AnimalStatusTarget, { order: number; description: string; finalAction?: string }> = {
  SEARCHING_ADOPT_AND_TRANSIT: { order: 1, description: 'Busca familia o tránsito (hogar provisorio)' },
  SEARCHING_ADOPT: { order: 2, description: 'Está bajo cuidado temporal y busca un hogar' },
  ADOPTED: { order: 3, description: 'Encontró un hogar definitivo', finalAction: 'fue adoptado' },
  FOUND: { order: 4, description: 'Se reencontró con su familia', finalAction: 'fue encontrado' },
  RESCUED: { order: 5, description: 'Ya está a salvo', finalAction: 'fue rescatado' },
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

export function getStatusSelectorOptions(currentStatus: string): AnimalStatusOption[] {
  const nextStatuses = getPossibleStatuses(currentStatus)
  if (nextStatuses.length <= 1) return nextStatuses

  const options = Object.hasOwn(statusConfig, currentStatus)
    ? [...nextStatuses, toOption(currentStatus as AnimalStatusTarget)]
    : nextStatuses

  return options.sort((a, b) => statusConfig[a.value].order - statusConfig[b.value].order)
}
