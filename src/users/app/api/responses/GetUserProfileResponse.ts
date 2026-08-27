export type UserRole = 'RESCUER' | 'TRANSITIONAL_HOME' | 'CARRIAGE';

type PhoneNumber = {
    areaCode: string;
    number: string;
};

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
    phoneNumber: string | PhoneNumber | null;
    profileImageUrl?: string | null;
    profileImageURL?: string | null;
}
