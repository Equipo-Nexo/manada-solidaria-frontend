export enum UserType {
    Comunidad = 'COMMUNITY',
    Rescatistas = 'RESCUER',
    Transportes = 'CARRIAGE',
    Tránsitos = 'TRANSITIONAL_HOME',
    Veterinarios = 'VET',
    Todos = '',
}

export type UserRole = Exclude<UserType, UserType.Todos>

export interface GetUsersRequest {
    role?: UserType
}
