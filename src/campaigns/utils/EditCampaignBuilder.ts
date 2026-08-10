import { buildDateTime } from "@/common/utils/DateTime"
import type { EditCampaignFormValues } from "../app/schemas/EditCampaign.schema"
import type { CampaignType } from "../app/types/Campaign.types"
import { campaignMap } from "./CreateCampaignBuilder"
import type { BaseEditCampaignRequest, EditCampaignRequest, EditDonationCampaignRequest, EditNewsCampaignRequest } from "../app/api/requests/EditCampaignRequest"

interface CampaignRequestBuilder<T extends EditCampaignRequest> {
  build(
    data: EditCampaignFormValues,
    commonRequest: Omit<BaseEditCampaignRequest, 'type'>
  ): T
}

const newsCampaignRequestBuilder: CampaignRequestBuilder<EditNewsCampaignRequest> = {
    build: (data, commonRequest) => {
      return {
        ...commonRequest,
        type: 'NEWS',
        category: data.category,
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

const donationCampaignRequestBuilder:
CampaignRequestBuilder<EditDonationCampaignRequest> = {
    build: (data, commonRequest) => ({
      ...commonRequest,
      type: 'DONATION',
      location: data.location,
      campaignEndDate: data.endDate
    }),
}

const campaignRequestBuilders: Record<
  CampaignType,
  CampaignRequestBuilder<EditCampaignRequest>
> = {
  NEWS: newsCampaignRequestBuilder,
  DONATION: donationCampaignRequestBuilder,
}

export const buildEditCampaignRequest = (
  data: EditCampaignFormValues
): EditCampaignRequest => {
  const selectedCampaign = campaignMap[data.category]
  const commonRequest: Omit<BaseEditCampaignRequest, 'type'> = {
    title: data.title,
    description: data.description,
    imageId: data.imageId,
    phoneNumber: `${data.phoneAreaCode}${data.phone}`,
    location: data.location,
  }

  return campaignRequestBuilders[selectedCampaign.type].build(
    data,
    commonRequest
  )
}