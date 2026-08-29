import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";

export type UserRole = 'RESCUER' | 'TRANSITIONAL_HOME' | 'CARRIAGE';

export interface GetUserProfileResponse {
    id: string;
    username: string;
    profile: Profile;
    roles: UserRole[];
}

interface Profile {
    name: string;
    lastname: string | null;
    email: string;
    phoneNumber?: PhoneNumber;
    profileImageURL?: string | null;
}
