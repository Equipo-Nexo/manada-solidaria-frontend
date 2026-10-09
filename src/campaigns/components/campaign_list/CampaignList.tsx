import type { CampaignCardData } from '@/campaigns/components/campaign_card/CampaignCard'
import { CampaignCard, Message } from '@components/index.ts'
import * as S from './CampaignList.styles'
import { publicationMessages } from '@utils/Messages'

type CampaignListProps = {
  campaigns: CampaignCardData[]
  isError: boolean
  isLoading: boolean
  onRetry: () => void
  onMoreInfo: (campaign: CampaignCardData) => void
}

function CampaignList({ campaigns, isError, isLoading, onRetry, onMoreInfo }: CampaignListProps) {
  if (isLoading) {
    return (
      <S.MessageContainer>
        <Message message={publicationMessages.loading} iconName="pawPrint" />
      </S.MessageContainer>
    )
  }

  if (isError) {
    return (
      <S.MessageContainer role="alert">
        <Message message={publicationMessages.loadError} iconName="pawPrint" />
        <S.RetryButton type="button" onClick={onRetry}>
          Reintentar
        </S.RetryButton>
      </S.MessageContainer>
    )
  }

  if (campaigns.length === 0) {
    return (
      <S.MessageContainer>
        <Message
          message={publicationMessages.emptyCategory}
          iconName="pawPrint"
        />
      </S.MessageContainer>
    )
  }

  return (
    <S.List>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} onMoreInfo={onMoreInfo} />
      ))}
    </S.List>
  )
}

export default CampaignList
