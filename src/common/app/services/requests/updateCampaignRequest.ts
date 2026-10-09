import type { Maybe } from "yup";
import type { Location } from "../responses/Location";
import type { CampaignType } from "@/campaigns/app/types/Campaign.types";
import type { PhoneNumber } from "../responses/PhoneNumber";

export interface UpdateCampaignRequest {
    type: CampaignType;
    title: string;
    description: string;
    imageId?: Maybe<string | undefined>;
    location?: Location | null;
    phoneNumber: PhoneNumber;
    amountToBeCollected?: number | null;
    campaignEndDate?: string | null;
    newsStartDateTime?: string | null;
    newsEndDateTime?: string | null;
}

export interface UpdateFundraisingCampaignRequest extends UpdateCampaignRequest {
    amountToBeCollected: number | null;
    amountCollected: number | null;
    campaignEndDate: string | null;
    accountAlias: string;
}