import type { Maybe } from "yup";
export type CampaignType = "NEWS" | "FUNDRAISING" | "DONATION";

export type DonationNeedCategory =
  | "FOOD"
  | "MEDICINE"
  | "SHELTER_AND_BEDDING"
  | "TOYS_AND_ACCESSORIES"
  | "CLOTHING_AND_BLANKETS"
  | "OTHER";

export type CampaignCategory =
  | "CASTRATION"
  | "VACCINATION"
  | "DEWORMING"
  | "OTHER";

export interface CreateCampaignRequest {
  type: CampaignType;
  category: CampaignCategory | null;
  title: string;
  description: string;
  imageId?: Maybe<string | undefined>;
  location?: {
    name: string;
    address: string;
    number: number | null;
    latitude: number;
    longitude: number;
  };
  items?: {
    category: DonationNeedCategory;
  }[];
  phoneNumber: string;
  accountAlias?: string | null;
  amountToBeCollected?: number | null;
  campaignEndDate?: string | null;
  newsStartDateTime?: string | null;
  newsEndDateTime?: string | null;
}

export type EditCampaignMutationRequest = {
  campaignId: string
  body: CreateCampaignRequest
}
