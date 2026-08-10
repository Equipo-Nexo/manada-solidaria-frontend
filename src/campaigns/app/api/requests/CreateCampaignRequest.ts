import type { Maybe } from "yup";
import type { CampaignCategory, CampaignType, DonationItem } from "../../types/Campaign.types";
import type { Location } from "@/common/app/services/responses/Location";

export const campaignFilters = [ '', "DONATION", "CASTRATION", "VACCINATION" ] as const;
export type CampaignFilter = typeof campaignFilters[number];

export interface BaseCreateCampaignRequest {
  type: CampaignType;
  title: string;
  description: string;
  imageId?: Maybe<string | undefined>;
  location?: Location;
  phoneNumber: string;  
  campaignEndDate?: string | null;
}

export interface CreateNewsCampaignRequest extends BaseCreateCampaignRequest {
  location: Location;
  category?: CampaignCategory;
  newsStartDateTime: string;
  newsEndDateTime: string;
}

export interface FundraisingCampaignRequest extends BaseCreateCampaignRequest {
  accountAlias: string;
  amountToBeCollected?: Maybe<number | undefined>;
}

export interface DonationCampaignRequest extends BaseCreateCampaignRequest {
  items: {
    category: DonationItem;
  }[];
}

export type CreateCampaignRequest = CreateNewsCampaignRequest | FundraisingCampaignRequest | DonationCampaignRequest;