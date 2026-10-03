import type { UserPostType } from '@/common/app/services/responses/userResponses';

export interface GetExternalUserProfileRequest {
    userId: string;
    type?: UserPostType;
}
