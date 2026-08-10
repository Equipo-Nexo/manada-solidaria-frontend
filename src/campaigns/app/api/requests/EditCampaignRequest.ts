import type { Location } from "@/common/app/services/responses/Location"
import type { CampaignCategory, CampaignType } from "../../types/Campaign.types"
import type { Maybe } from "yup"

export interface BaseEditCampaignRequest {
  type: CampaignType
  title: string
  description: string
  imageId: Maybe<string | undefined>
  phoneNumber: string
  location: Location
}

export interface EditDonationCampaignRequest extends BaseEditCampaignRequest {
  campaignEndDate: string
}

export interface EditNewsCampaignRequest extends BaseEditCampaignRequest {
  category: CampaignCategory
}

export interface UpdateFundraisingCampaignRequest extends BaseEditCampaignRequest {
  amountToBeCollected?: Maybe<number | undefined>;
  amountCollected?: Maybe<number | undefined>;
  campaignEndDate?: Maybe<string | undefined>;
  accountAlias: string;
}

export type EditCampaignRequest = EditDonationCampaignRequest | EditNewsCampaignRequest 

export type EditCampaignMutationRequest = {
  campaignId: string
  body: EditCampaignRequest
}