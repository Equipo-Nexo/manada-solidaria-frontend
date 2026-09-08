export enum UserType {
    Comunidad = 'COMMUNITY',
    Rescatistas = 'RESCUER',
    Transportistas = 'CARRIAGE',
    Tránsitos = 'TRANSITIONAL_HOME',
    Veterinarios = 'VET',
    Todos = '',
}

export type UserRole = Exclude<UserType, UserType.Todos>

export interface GetUsersRequest {
    role?: UserType
}
