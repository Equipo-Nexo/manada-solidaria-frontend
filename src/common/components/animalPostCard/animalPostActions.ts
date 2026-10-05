import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber"
import { openWhatsApp } from "@/common/utils/Whatsapp"
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
  to?: string
  onClick?: (phoneNumber?: PhoneNumber, animalName?: string, viewMapAction?: () => void) => void;
}

export type AnimalPostActionsByStatus = {
  status: AnimalPostStatusText
  actions: AnimalPostAction[]
}

const transitText = (animalName?: string) => `¡Hola! Me gustaria transitar${animalName ? ` a ${animalName}` : "." }`
const collaborateText = (animalName?: string) => `¡Hola! Me gustaría colaborar${animalName ? ` con ${animalName}` : "." }`
const shareInfoText = (animalName?: string) => `¡Hola! Tengo info${animalName ? ` de ${animalName}` : "." }`

type ActionVariant = 'primary' | 'secondary'

const TransitAction = (variant: ActionVariant): AnimalPostAction => ({
  id: 'foster',
  label: 'Transitar',
  variant,
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) =>
    openWhatsApp(
      `${phoneNumber?.areaCode}${phoneNumber?.number}`,
      transitText(animalName)
    ),
})

const AdoptAction = (variant: ActionVariant): AnimalPostAction => ({
  id: 'adopt',
  label: 'Adoptar',
  variant,
  to: '/formulario-adopcion',
})

const CollaborateAction = (variant: ActionVariant): AnimalPostAction => ({
  id: 'collaborate',
  label: 'Colaborar',
  variant,
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) =>
    openWhatsApp(
      `${phoneNumber?.areaCode}${phoneNumber?.number}`,
      collaborateText(animalName)
    ),
})

const ViewMapAction = (variant: ActionVariant): AnimalPostAction => ({
  id: 'view-map',
  label: 'Ver en el mapa',
  variant,
  requiresContactPhone: false,
  onClick: (_, __, viewMapAction) => {
    viewMapAction?.()
  },
})

const ShareInfoAction = (variant: ActionVariant): AnimalPostAction => ({
  id: 'share-info',
  label: 'Tengo info',
  variant,
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) =>
    openWhatsApp(
      `${phoneNumber?.areaCode}${phoneNumber?.number}`,
      shareInfoText(animalName)
    ),
})

export const animalPostActions: AnimalPostActionsByStatus[] = [
  {
    status: 'En adopción',
    actions: [
      TransitAction('secondary'),
      AdoptAction('primary'),
    ],
  },
  {
    status: 'En tránsito',
    actions: [
      CollaborateAction('secondary'),
      AdoptAction('primary'),
    ],
  },
  {
    status: 'Perdido',
    actions: [
      ViewMapAction('secondary'),
      ShareInfoAction('primary'),
    ],
  },
  {
    status: 'En la calle',
    actions: [
      ViewMapAction('secondary'),
      CollaborateAction('primary'),
    ],
  },
]

export const getAnimalPostActions = (
  status: AnimalPostStatusText,
  phoneNumber?: PhoneNumber,
): AnimalPostAction[] => {
  const actions = animalPostActions.find((item) => item.status === status)?.actions ?? []
  const hasContactPhone = Boolean(phoneNumber)

  return actions.filter((action) => !action.requiresContactPhone || hasContactPhone)
}
