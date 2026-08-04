import type { CampaignType } from "../../components/campaignCard/CampaignCard";
import type { DonationNeedCategory } from "../services/requests/createCampaignRequest";

export type CampaignResponse = {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  imageId: string;
  accountAlias?: string;
  amountToBeCollected?: number;
  amountCollected?: number;
  location: {
    id: string;
    name: string;
    address: string;
    number: number;
    latitude: number;
    longitude: number;
  };
};

export type CampaignPageResponse = {
  content: CampaignResponse[];
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
  location?: {
    id: string;
    name: string;
    address: string;
    number: number | null;
    latitude: number;
    longitude: number;
  };
  items?: { category: DonationNeedCategory }[];
  phoneNumber: string;
  accountAlias?: string | null;
  amountToBeCollected?: number | null;
  campaignEndDate?: string | null;
  newsStartDateTime?: string | null;
  newsEndDateTime?: string | null;
};
