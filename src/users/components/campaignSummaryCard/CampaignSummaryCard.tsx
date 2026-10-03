import type { CampaignResponse } from '@/common/app/types/Campaign.types'
import { campaignCategoryLabels } from '@/campaigns/utils/CampaignUtils'
import PostSummaryCard from '../postSummaryCard/PostSummaryCard'
import { CategoryBadge } from '../postSummaryCard/PostSummaryCard.styles'

export type CampaignSummaryCardProps = {
  campaign: CampaignResponse
  onViewMore?: () => void
}

function CampaignSummaryCard({ campaign, onViewMore }: CampaignSummaryCardProps) {
  const category = campaign.type.toUpperCase()
  const categoryLabel = campaignCategoryLabels[category] ?? 'Campaña'

  return (
    <PostSummaryCard
      title={campaign.title}
      imageUrl={campaign.imageId}
      location={campaign.location}
      description={campaign.description}
      badges={<CategoryBadge $campaignType={category}>{categoryLabel}</CategoryBadge>}
      onViewMore={onViewMore}
    />
  )
}

export default CampaignSummaryCard
