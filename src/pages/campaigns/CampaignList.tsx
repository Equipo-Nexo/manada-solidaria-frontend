import type { CampaignCardData } from '../../components/campaignCard/CampaignCard'
import CampaignCard from '../../components/campaignCard/CampaignCard'
import Message from '../../components/message/message'
import * as S from './CampaignList.styles'
import { publicationMessages } from '../../utils/Messages'

type CampaignListProps = {
  campaigns: CampaignCardData[]
  isError: boolean
  isLoading: boolean
  onRetry: () => void
}

function CampaignList({ campaigns, isError, isLoading, onRetry }: CampaignListProps) {
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
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </S.List>
  )
}

export default CampaignList
