import type { PhoneNumber } from '@/common/app/services/responses/PhoneNumber'

export interface EditPersonalDataRequest {
    name?: string;
    lastname?: string;
    email: string;
    phoneNumber: PhoneNumber | null;
    profileImageURL: string;
}
