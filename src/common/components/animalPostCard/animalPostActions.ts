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
  onClick: (phoneNumber?: PhoneNumber, animalName?: string, viewMapAction?: () => void) => void; 
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

const transitText = (animalName?: string) => `¡Hola! Me gustaria transitar${animalName ? ` a ${animalName}` : "." }`
const adoptText = (animalName?: string) => `¡Hola! Me gustaria adoptar${animalName ? ` a ${animalName}` : "." }`
const collaborateText = (animalName?: string) => `¡Hola! Me gustaría colaborar${animalName ? ` con ${animalName}` : "." }`
const shareInfoText = (animalName?: string) => `¡Hola! Tengo info${animalName ? ` de ${animalName}` : "." }`

const TransitAction: AnimalPostAction = { 
  id: 'foster', 
  label: 'Transitar', 
  variant: 'secondary',
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, transitText(animalName))
}
const AdoptAction: AnimalPostAction = { 
  id: 'adopt', 
  label: 'Adoptar', 
  variant: 'primary', 
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, adoptText(animalName))
}
const CollaborateAction: AnimalPostAction = { 
  id: 'collaborate', 
  label: 'Colaborar', 
  variant: 'secondary', 
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, collaborateText(animalName))
}
const ViewMapAction: AnimalPostAction = { 
  id: 'view-map', 
  label: 'Ver en el mapa', 
  variant: 'secondary',
  requiresContactPhone: false,
  onClick: (_, __,viewMapAction) => {
    viewMapAction?.()
  },
}
const ShareInfoAction: AnimalPostAction = { 
  id: 'share-info', 
  label: 'Tengo info', 
  variant: 'primary', 
  requiresContactPhone: true,
  onClick: (phoneNumber, animalName) => openWhatsApp(`${phoneNumber?.areaCode}${phoneNumber?.number}`, shareInfoText(animalName))
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
