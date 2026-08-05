import { ANIMAL_POST_STATUS_LABELS } from '@models/AnimalPost.types'
import type { AnimalPostStatusText } from "@utils/AnimalPostUtils"

export type AnimalPostActionId =
  | 'foster'
  | 'adopt'
  | 'collaborate'
  | 'view-map'
  | 'share-info'

export type AnimalPostAction = {
  id: AnimalPostActionId
  label: string
  variant: 'primary' | 'secondary'
  requiresContactPhone?: boolean
}

export type AnimalPostActionsByStatus = {
  status: AnimalPostStatusText
  actions: AnimalPostAction[]
}

export const animalPostActions: AnimalPostActionsByStatus[] = [
  {
    status: ANIMAL_POST_STATUS_LABELS.ADOPTION,
    actions: [
      { id: 'foster', label: 'Transitar', variant: 'secondary' },
      { id: 'adopt', label: 'Adoptar', variant: 'primary' },
    ],
  },
  {
    status: ANIMAL_POST_STATUS_LABELS.SEARCHING_ADOPT,
    actions: [
      { id: 'collaborate', label: 'Colaborar', variant: 'secondary' },
      { id: 'adopt', label: 'Adoptar', variant: 'primary' },
    ],
  },
  {
    status: ANIMAL_POST_STATUS_LABELS.LOST,
    actions: [
      { id: 'view-map', label: 'Ver en el mapa', variant: 'secondary' },
      { id: 'share-info', label: 'Tengo info', variant: 'primary' },
    ],
  },
  {
    status: ANIMAL_POST_STATUS_LABELS.IN_STREET,
    actions: [
      { id: 'view-map', label: 'Ver en el mapa', variant: 'secondary' },
      {
        id: 'collaborate',
        label: 'Colaborar',
        variant: 'primary',
        requiresContactPhone: true,
      },
    ],
  },
]

export const getAnimalPostActions = (
  status: AnimalPostStatusText,
  contactPhone?: string,
): AnimalPostAction[] => {
  const actions = animalPostActions.find((item) => item.status === status)?.actions ?? []
  const hasContactPhone = Boolean(contactPhone?.trim())

  return actions.filter((action) => !action.requiresContactPhone || hasContactPhone)
}
