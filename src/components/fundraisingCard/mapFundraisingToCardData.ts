import type { FundraisingCampaignResponse } from "../../app/types/Campaign.types";
import type { FundraisingCardData } from "./FundraisingCard";

export const mapFundraisingToCardData = (
  campaign: FundraisingCampaignResponse,
): FundraisingCardData => ({
  id: campaign.id,
  title: campaign.title,
  description: campaign.description,
  imageUrl: campaign.imageId,
  accountAlias: campaign.accountAlias ?? "",
  amountToBeCollected: campaign.amountToBeCollected,
  amountCollected: campaign.amountCollected,
});
