import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";
import type { Role } from "../../types/User.types";

export interface GetUserProfileResponse {
    id: string;
    username: string;
    profile: Profile;
    roles: Role[];
}

interface Profile {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: PhoneNumber | null;
    profileImageURL: string | undefined;
}
