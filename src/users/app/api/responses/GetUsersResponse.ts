import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";
import type { UserRole } from "../requests/GetUsersRequest";

export type GetUsersResponse = User[];

interface User {
    id: string;
    username: string;
    roles: UserRole[];
    phoneNumber: PhoneNumber | null;
    profileImageURL: string | null;
}

