import type { UserPostType } from '@/common/app/services/responses/userResponses';

export interface GetSpecificUserProfileRequest {
    userId: string;
    type?: UserPostType;
}
