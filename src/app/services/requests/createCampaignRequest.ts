export type CampaignType = "NEWS" | "FUNDRAISING";

export type CampaignCategory =
  | "DONATION"
  | "CASTRATION"
  | "VACCINATION"
  | "DEWORMING"
  | "OTHER";

export interface CreateCampaignRequest {
  type: CampaignType;
  category: CampaignCategory;

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

  accountAlias?: string | null;
  amountToBeCollected?: number | null;
  campaignEndDate?: string | null;

  newsStartDateTime?: string | null;
  newsEndDateTime?: string | null;
}
