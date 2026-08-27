export type UserRole = 'RESCUER' | 'TRANSITIONAL_HOME' | 'CARRIAGE';

export interface GetUserProfileResponse {
    id: string;
    username: string;
    profile: Profile;
    roles: UserRole[];
}

interface Profile {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
}
