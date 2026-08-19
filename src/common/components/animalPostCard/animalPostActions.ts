import type { Location } from "@/common/app/services/responses/Location"
import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber"
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
  onClick: (phoneNumber?: PhoneNumber, viewMapAction?: () => void) => void; 
}

export type AnimalPostActionsByStatus = {
  status: AnimalPostStatusText
  actions: AnimalPostAction[]
}

const openWhatsApp = (phoneNumber: string, text: string) => window.open(
  `https://wa.me/549${phoneNumber}?text=${text}`,
  '_blank',
  'noopener,noreferrer'
)

const transitText = "¡Hola! Me gustaria transitar"
const adoptText = "¡Hola! Me gustaria adoptar"
const collaborateText = "¡Hola! Me gustaría colaborar"
const shareInfoText = "¡Hola! Tengo info"

const TransitAction: AnimalPostAction = { 
  id: 'foster', 
  label: 'Transitar', 
  variant: 'secondary',
  requiresContactPhone: true,
  onClick: (phoneNumber) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, transitText)
}
const AdoptAction: AnimalPostAction = { 
  id: 'adopt', 
  label: 'Adoptar', 
  variant: 'primary', 
  requiresContactPhone: true,
  onClick: (phoneNumber) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, adoptText)
}
const CollaborateAction: AnimalPostAction = { 
  id: 'collaborate', 
  label: 'Colaborar', 
  variant: 'secondary', 
  requiresContactPhone: true,
  onClick: (phoneNumber) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, collaborateText)
}
const ViewMapAction: AnimalPostAction = { 
  id: 'view-map', 
  label: 'Ver en el mapa', 
  variant: 'secondary',
  requiresContactPhone: false,
  onClick: (_, viewMapAction) => {
    viewMapAction?.()
  },
}
const ShareInfoAction: AnimalPostAction = { 
  id: 'share-info', 
  label: 'Tengo info', 
  variant: 'primary', 
  requiresContactPhone: true,
  onClick: (phoneNumber) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, shareInfoText)
}

export const animalPostActions: AnimalPostActionsByStatus[] = [
  { status: 'En adopción', actions: [ TransitAction, AdoptAction ] },
  { status: 'En tránsito', actions: [ CollaborateAction, AdoptAction ] },
  { status: 'Perdido', actions: [ ViewMapAction, ShareInfoAction ] },
  { status: 'En la calle', actions: [ViewMapAction, CollaborateAction] },
]

export const getAnimalPostActions = (
  status: AnimalPostStatusText,
  phoneNumber?: PhoneNumber,
): AnimalPostAction[] => {
  const actions = animalPostActions.find((item) => item.status === status)?.actions ?? []
  const hasContactPhone = Boolean(phoneNumber)

  return actions.filter((action) => !action.requiresContactPhone || hasContactPhone)
}
