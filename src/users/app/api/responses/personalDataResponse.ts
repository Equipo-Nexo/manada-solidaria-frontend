import type { PhoneNumber } from '@/common/app/services/responses/PhoneNumber'

export interface PersonalDataResponse {
    name: string;
    lastname: string;
    phoneNumber?: PhoneNumber;
    email: string;
    profileImageURL: string;
}
