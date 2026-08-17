export interface GetUserProfileResponse {
    id: string;
    username: string;
    profile: Profile;
    roles: string[];
}

interface Profile {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    profileImageUrl: string;
}
