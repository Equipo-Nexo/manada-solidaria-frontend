import type { CampaignType } from "@components/campaignCard/CampaignCard";
import type { Location } from "@services/responses/Location";
import type { DonationNeedCategory } from "@services/requests/createCampaignRequest";

export type CampaignResponse = {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  imageId: string;
  accountAlias?: string;
  amountToBeCollected?: number;
  location: Location | undefined;
};

export type FundraisingCampaignResponse = CampaignResponse & {
  accountAlias: string;
  amountToBeCollected: number;
  amountCollected: number;
  phoneNumber: string;
  campaignEndDate: string;
  location: Location;
}

export type CampaignPageResponse = {
  content: CampaignResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
};
export type FundraisingCampaignPageResponse = {
  content: FundraisingCampaignResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
};

export type CampaignDetailsType = CampaignType | "fundraising";

export type CampaignDetailsResponse = {
  id: string;
  type: CampaignDetailsType;
  title: string;
  description: string;
  imageId?: string;
  imageUrl?: string;
  location?: Location;
  items?: { category: DonationNeedCategory }[];
  phoneNumber: string;
  accountAlias?: string | null;
  amountToBeCollected?: number | null;
  campaignEndDate?: string | null;
  newsStartDateTime?: string | null;
  newsEndDateTime?: string | null;
};
