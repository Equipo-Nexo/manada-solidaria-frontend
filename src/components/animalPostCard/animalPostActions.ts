import type { AnimalPostStatusText } from "../../utils/AnimalPostUtils"

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
    status: 'En adopción',
    actions: [
      { id: 'foster', label: 'Transitar', variant: 'secondary' },
      { id: 'adopt', label: 'Adoptar', variant: 'primary' },
    ],
  },
  {
    status: 'En tránsito',
    actions: [
      { id: 'collaborate', label: 'Colaborar', variant: 'secondary' },
      { id: 'adopt', label: 'Adoptar', variant: 'primary' },
    ],
  },
  {
    status: 'Perdido',
    actions: [
      { id: 'view-map', label: 'Ver en el mapa', variant: 'secondary' },
      { id: 'share-info', label: 'Tengo info', variant: 'primary' },
    ],
  },
  {
    status: 'En la calle',
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
