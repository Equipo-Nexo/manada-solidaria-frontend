import type { CampaignType } from "../../components/campaignCard/CampaignCard";
import type { Location } from "../services/responses/Location";

export type CampaignResponse = {
  id: string;
  type: CampaignType;
  title: string;
  description: string;
  imageId: string;
  location: Location | undefined;
};

export type FundraisingCampaignResponse = CampaignResponse & {
  accountAlias: string;
  amountToBeCollected: number;
  amountCollected: number;
  phoneNumber: string;
  campaignEndDate: string;
}

export type CampaignPageResponse = {
  content: CampaignResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
};
