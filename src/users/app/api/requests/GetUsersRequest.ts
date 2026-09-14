import type { Role } from "../../types/User.types"

export enum UserType {
    Comunidad = 'COMMUNITY',
    Rescatistas = 'RESCUER',
    Transportistas = 'CARRIAGE',
    Tránsitos = 'TRANSITIONAL_HOME',
    Veterinarios = 'VET',
    Todos = '',
}

export type UserRole = Role

export interface GetUsersRequest {
    role?: UserType
}
