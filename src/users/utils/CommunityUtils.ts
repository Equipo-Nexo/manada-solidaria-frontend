import { theme } from "@/common/styles/theme";
import { UserType } from "../app/api/requests/GetUsersRequest";

export const categoryLabels: Record<UserType, string> = {
    [UserType.Todos]: 'Todos',
    [UserType.Comunidad]: 'Comunidad',
    [UserType.Rescatistas]: 'Rescatistas',
    [UserType.Transportistas]: 'Transportistas',
    [UserType.Tránsitos]: 'Tránsitos',
    [UserType.Veterinarios]: 'Veterinarios',
}

export const categories: UserType[] = [
    UserType.Todos,
    UserType.Comunidad,
    UserType.Rescatistas,
    UserType.Transportistas,
    UserType.Tránsitos,
    UserType.Veterinarios,
]

export const roleConfig = {
    [UserType.Rescatistas]: {
        label: 'Rescatista',
        backgroundColor: `${theme.colors.statusFoundBackground}`,
        textColor: `${theme.colors.success}`,
    },
    [UserType.Tránsitos]: {
        label: 'Tránsito',
        backgroundColor: theme.colors.neutral,
        textColor: theme.colors.secondary,
    },
    [UserType.Transportistas]: {
        label: 'Transportista',
        backgroundColor: theme.colors.neutral,
        textColor: theme.colors.brand,
    },
    [UserType.Comunidad]: {
        label: 'Comunidad',
        backgroundColor: theme.colors.tertiary,
        textColor: theme.colors.statusAdoptionText,
    },
    [UserType.Veterinarios]: {
        label: 'Veterinario',
        backgroundColor: theme.colors.soft,
        textColor: theme.colors.darkColor,
    },
} as const