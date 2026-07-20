import type { CampaignType } from "../../components/campaignCard/CampaignCard";

export type CampaignResponse = {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  imageId: string;
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
