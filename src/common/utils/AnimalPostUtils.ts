import { theme } from "@styles/theme";

export type AnimalPostStatusText =
  | 'En adopción'
  | 'En tránsito'
  | 'En la calle'
  | 'Perdido'
  | 'Adoptado'
  | 'Encontrado'
  | 'Rescatado'

export type StatusUtil = {
    text: AnimalPostStatusText;
    backgroundColor: string;
    fontColor: string;
}

export const AnimalPostStatus: Record<string, StatusUtil> = {
    'SEARCHING': {
        text: 'Perdido',
        backgroundColor: theme.colors.statusLostBackground,
        fontColor: theme.colors.statusSearchingtext
    },
    'FOUND': {
        text: 'Encontrado',
        backgroundColor: theme.colors.statusFoundBackground,
        fontColor: theme.colors.success
    },
    'SEARCHING_ADOPT': {
        text: 'En tránsito',
        backgroundColor: theme.colors.neutral,
        fontColor: theme.colors.brand
    },
    'SEARCHING_ADOPT_AND_TRANSIT': {
        text: 'En adopción',
        backgroundColor: theme.colors.tertiary,
        fontColor: theme.colors.statusAdoptionText
    },
    'ADOPTED': {
        text: 'Adoptado',
        backgroundColor: theme.colors.neutral,
        fontColor: theme.colors.secondary
    },
    'TO_RESCUE': {
        text: 'En la calle',
        backgroundColor: theme.colors.statusStreetBackground,
        fontColor: theme.colors.statusStreetText
    },
    'RESCUED': {
        text: 'Rescatado',
        backgroundColor: theme.colors.statusRescuedBackground,
        fontColor: theme.colors.statusRescuedText
    }
}