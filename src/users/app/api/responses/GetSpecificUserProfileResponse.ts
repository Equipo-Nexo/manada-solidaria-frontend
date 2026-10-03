import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";
import type { Role } from "../../types/User.types";
import type { AnimalPost } from "@/animals/app/types/AnimalPost.types";
import type { CampaignResponse, FundraisingCampaignResponse } from "@/common/app/types/Campaign.types";

export interface GetSpecificUserProfileResponse {
    id: string;
    username: string;
    profile: Profile;
    roles: Role[];
    posts: ProfilePost[];
}

interface Profile {
    name: string;
    lastname: string | null;
    email: string;
    phoneNumber: PhoneNumber | null;
    profileImageURL: string | undefined;
}

export type ProfilePost =
    | (Omit<AnimalPost, 'imageUrl'> & {
        postType: 'animal';
        imageUrl?: string | null;
        imageId?: string | null;
    })
    | (CampaignResponse & { postType: 'campaign' })
    | (FundraisingCampaignResponse & { postType: 'fundraising' });

