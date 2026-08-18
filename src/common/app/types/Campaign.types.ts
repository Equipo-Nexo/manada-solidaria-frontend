import type { Location } from "@services/responses/Location";
import type { CampaignCategory, CampaignType, DonationItem } from "@/campaigns/app/types/Campaign.types";

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

export type CampaignDetailsType = CampaignType | CampaignCategory;

export type CampaignDetailsResponse = {
  id: string;
  type: CampaignDetailsType;
  title: string;
  description: string;
  imageId?: string;
  imageUrl?: string;
  location: Location;
  items?: { category: DonationItem }[];
  phoneNumber: string;
  accountAlias?: string;
  amountToBeCollected?: number;
  campaignEndDate?: string;
  newsStartDateTime?: string;
  newsEndDateTime?: string;
};
