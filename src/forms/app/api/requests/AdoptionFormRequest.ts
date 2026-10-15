import type { PhoneNumber } from '@/common/app/services/responses/PhoneNumber';

export interface AdoptionFormRequest {
    adoptionPostId: string;
    description: string;
    phoneNumber: PhoneNumber;
    answers: { questionId: string; answer: string }[];
}
