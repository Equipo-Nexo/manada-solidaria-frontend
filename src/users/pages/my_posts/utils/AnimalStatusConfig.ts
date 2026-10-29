import type { AnimalPostStatus } from '@animals/app/types/AnimalPost.types'
import type { PossibleStatus } from '@/users/components/animal_post_status_sheet/UpdatePostStatusSheet.types'

type StatusOptionConfig = Omit<PossibleStatus, 'primaryButton' | 'secondaryButton'> & {
  primaryButton: { label: string }
  secondaryButton: { label: string }
}

interface StatusSheetConfig {
  bottomSheetTitle: string
  bottomSheetDescription: string
  possibleStatus: StatusOptionConfig[]
}

export const animalStatusConfig: Record<AnimalPostStatus, StatusSheetConfig> = {
  CREATED: {
    bottomSheetTitle: 'Cambiar estado',
    bottomSheetDescription: 'Esta publicación todavía no tiene cambios de estado disponibles.',
    possibleStatus: [],
  },
  SEARCHING: {
    bottomSheetTitle: '¿{Name} fue encontrado?',
    bottomSheetDescription: 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.',
    possibleStatus: [
      {
        backendValue: 'FOUND',
        isFinalStatus: true,
        confirmationTitle: '¿{Name} fue encontrado?',
        confirmationDescription: 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.',
        label: 'Encontrado',
        title: 'Volvió con su familia',
        description: 'Ya se reencontró con sus dueños.',
        primaryButton: { label: 'Sí, {name} fue encontrado.' },
        secondaryButton: { label: 'No, volver.' },
      },
    ],
  },
  TO_RESCUE: {
    bottomSheetTitle: '¿{Name} fue rescatado?',
    bottomSheetDescription: 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.',
    possibleStatus: [
      {
        backendValue: 'RESCUED',
        isFinalStatus: true,
        confirmationTitle: '¿{Name} fue rescatado?',
        confirmationDescription: 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.',
        label: 'Rescatado',
        title: 'Ya está a salvo',
        description: 'Recibió la ayuda que necesitaba.',
        primaryButton: { label: 'Sí, fue rescatado.' },
        secondaryButton: { label: 'No, volver.' },
      },
    ],
  },
  SEARCHING_ADOPT_AND_TRANSIT: {
    bottomSheetTitle: 'Cambiar estado',
    bottomSheetDescription: '¿En qué estado está {name}?',
    possibleStatus: [
      {
        backendValue: 'SEARCHING_ADOPT_AND_TRANSIT',
        isFinalStatus: false,
        label: 'En adopción',
        title: 'En adopción',
        description: 'Está bajo cuidado temporal y busca un hogar.',
        primaryButton: { label: 'Sí, está en tránsito.' },
        secondaryButton: { label: 'No, volver.' },
      },
      {
        backendValue: 'SEARCHING_ADOPT',
        isFinalStatus: false,
        label: 'En tránsito',
        title: 'En tránsito',
        description: 'Está bajo cuidado temporal y busca un hogar.',
        primaryButton: { label: 'Sí, {name} está en tránsito.' },
        secondaryButton: { label: 'No, volver.' },
      },
      {
        backendValue: 'ADOPTED',
        isFinalStatus: true,
        confirmationTitle: '¿{Name} fue adoptado?',
        confirmationDescription: 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.',
        label: 'Adoptado',
        title: 'Adoptado',
        description: 'Ya tiene un hogar definitivo.',
        primaryButton: { label: 'Sí, fue adoptado.' },
        secondaryButton: { label: 'No, volver.' },
      },
    ],
  },
  SEARCHING_ADOPT: {
    bottomSheetTitle: 'Cambiar estado',
    bottomSheetDescription: '¿En qué estado está {name}?',
    possibleStatus: [
      {
        backendValue: 'SEARCHING_ADOPT_AND_TRANSIT',
        isFinalStatus: false,
        label: 'En adopción',
        title: 'En adopción',
        description: 'Necesita un hogar definitivo o provisorio.',
        primaryButton: { label: 'Sí, busca familia o tránsito.' },
        secondaryButton: { label: 'No, volver.' },
      },
      {
        backendValue: 'SEARCHING_ADOPT',
        isFinalStatus: false,
        label: 'En tránsito',
        title: 'En tránsito',
        description: 'Está bajo cuidado temporal y busca un hogar.',
        primaryButton: { label: 'Sí, busca familia o tránsito.' },
        secondaryButton: { label: 'No, volver.' },
      },
      {
        backendValue: 'ADOPTED',
        isFinalStatus: true,
        confirmationTitle: '¿{Name} fue adoptado?',
        confirmationDescription: 'La publicación se cerrará definitivamente y no podrás volver a cambiar su estado.',
        label: 'Adoptado',
        title: 'Encontró una familia',
        description: 'Ya tiene un hogar definitivo.',
        primaryButton: { label: 'Sí, fue adoptado.' },
        secondaryButton: { label: 'No, volver.' },
      },
    ],
  },
  ADOPTED: {
    bottomSheetTitle: 'Publicación cerrada',
    bottomSheetDescription: '{Name} encontró un hogar definitivo.',
    possibleStatus: [],
  },
  FOUND: {
    bottomSheetTitle: 'Publicación cerrada',
    bottomSheetDescription: '{Name} volvió con su familia.',
    possibleStatus: [],
  },
  RESCUED: {
    bottomSheetTitle: 'Publicación cerrada',
    bottomSheetDescription: '{Name} ya está a salvo.',
    possibleStatus: [],
  },
}
