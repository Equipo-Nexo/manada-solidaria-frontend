import type { CampaignResponse } from '@models/Campaign.types'
import type { CampaignCardData } from './CampaignCard'

export const mapCampaignToCardData = (
  campaign: CampaignResponse,
): CampaignCardData => ({
  id: campaign.id,
  type: campaign.type,
  title: campaign.title,
  description: campaign.description,
  location: campaign.location,
  imageUrl: campaign.imageId,
})
