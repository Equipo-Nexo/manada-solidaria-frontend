import type { DonationNeedCategory } from "../../../pages/publish/PublishCampaign";

export type CampaignType = "NEWS" | "FUNDRAISING" | "DONATION";

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
  imageId?: string;
  location: {
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
