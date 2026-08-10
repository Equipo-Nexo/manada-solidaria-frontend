import { buildDateTime } from "@/common/utils/DateTime"
import type { BaseCreateCampaignRequest, CreateCampaignRequest, CreateNewsCampaignRequest, DonationCampaignRequest, FundraisingCampaignRequest } from "../app/api/requests/CreateCampaignRequest"
import type { CampaignCategory, CampaignType, DonationItem } from "../app/types/Campaign.types"
import type { PublishCampaignForm } from "../app/schemas/PublishCampaignSchema"

export const campaignMap: Record<string, { type: CampaignType, category?: CampaignCategory }> = {
  FUNDRAISING: {
    type: 'FUNDRAISING',
  },
  DONATION: {
    type: 'DONATION',
  },
  OTHER: {
    type: 'NEWS',
    category: 'OTHER',
  },
  VACCINATION: {
    type: 'NEWS',
    category: 'VACCINATION',
  },
  DEWORMING: {
    type: 'NEWS',
    category: 'DEWORMING',
  },
  CASTRATION: {
    type: 'NEWS',
    category: 'CASTRATION',
  },
} as const

interface CampaignRequestBuilder<T extends CreateCampaignRequest> {
  build(
    data: PublishCampaignForm,
    commonRequest: Omit<BaseCreateCampaignRequest, 'type'>
  ): T
}

const newsCampaignRequestBuilder: CampaignRequestBuilder<CreateNewsCampaignRequest> = {
    build: (data, commonRequest) => {
      return {
        ...commonRequest,
        type: 'NEWS',
        category: data.category,
        location: data.location,
        newsStartDateTime: buildDateTime(
          data.startDate,
          data.startTime
        ),
        newsEndDateTime: buildDateTime(
          data.endDate,
          data.endTime
        ),
      }
    },
  }

const fundraisingCampaignRequestBuilder:
  CampaignRequestBuilder<FundraisingCampaignRequest> = {
    build: (data, commonRequest) => {
      if (!data.accountAlias) {
        throw new Error(
          "accountAlias is required for FUNDRAISING campaigns"
        )
      }

      return {
        ...commonRequest,
        type: "FUNDRAISING",
        accountAlias: data.accountAlias,
        amountToBeCollected: data.amountToBeCollected,
      }
    },
  }

const donationCampaignRequestBuilder:
  CampaignRequestBuilder<DonationCampaignRequest> = {
    build: (data, commonRequest) => ({
      ...commonRequest,
      type: 'DONATION',
      items: (data.donationNeeds ?? []).map((category: DonationItem) => ({
        category,
      })),
      campaignEndDate: data.endDate || undefined,
    }),
  }

const campaignRequestBuilders: Record<
  CampaignType,
  CampaignRequestBuilder<CreateCampaignRequest>
> = {
  NEWS: newsCampaignRequestBuilder,
  FUNDRAISING: fundraisingCampaignRequestBuilder,
  DONATION: donationCampaignRequestBuilder,
}

export const buildCreateCampaignRequest = (
  data: PublishCampaignForm
): CreateCampaignRequest => {
  const selectedCampaign = campaignMap[data.category]

  const commonRequest: Omit<BaseCreateCampaignRequest, 'type'> = {
    title: data.title,
    description: data.description,
    imageId: data.imageId,
    phoneNumber: `${data.phoneAreaCode}${data.phone}`,
    location: data.location
  }

  return campaignRequestBuilders[selectedCampaign.type].build(
    data,
    commonRequest
  )
}



