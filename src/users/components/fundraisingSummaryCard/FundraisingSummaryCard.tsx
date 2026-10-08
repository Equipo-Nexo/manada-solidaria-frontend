import type { FundraisingCampaignResponse } from '@/common/app/types/Campaign.types'
import { campaignCategoryLabels } from '@/campaigns/utils/CampaignUtils'
import PostSummaryCard from '../postSummaryCard/PostSummaryCard'
import { CategoryBadge } from '../postSummaryCard/PostSummaryCard.styles'

export type FundraisingSummaryCardProps = {
  fundraising: FundraisingCampaignResponse
  onViewMore?: () => void
}

function FundraisingSummaryCard({ fundraising, onViewMore }: FundraisingSummaryCardProps) {
  return (
    <PostSummaryCard
      title={fundraising.title}
      imageUrl={fundraising.imageId}
      location={fundraising.location}
      description={fundraising.description}
      badges={<CategoryBadge>{campaignCategoryLabels.FUNDRAISING}</CategoryBadge>}
      onViewMore={onViewMore}
    />
  )
}

export default FundraisingSummaryCard
