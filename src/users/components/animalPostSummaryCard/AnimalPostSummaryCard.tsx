import { AnimalPostStatus } from '@/common/utils/AnimalPostUtils'
import type { AnimalPostCardProps } from '@/common/components/animalPostCard/animalPostCard'
import PostSummaryCard from '../postSummaryCard/PostSummaryCard'
import * as S from './AnimalPostSummaryCard.styles'
import { StatusContainer } from '../postSummaryCard/PostSummaryCard.styles'

export type AnimalPostSummaryCardProps = Pick<
  AnimalPostCardProps,
  'name' | 'status' | 'location' | 'description' | 'imageUrl' | 'reward' | 'onViewMore'
>

function AnimalPostSummaryCard({
  name,
  status,
  location,
  description,
  imageUrl,
  reward,
  onViewMore,
}: AnimalPostSummaryCardProps) {
  const statusInfo = status ? AnimalPostStatus[status] : undefined
  const formattedReward =
    status === 'SEARCHING' && typeof reward === 'number' && Number.isFinite(reward) && reward > 0
      ? new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }).format(reward)
      : undefined

  return (
    <PostSummaryCard
      title={name}
      imageUrl={imageUrl}
      location={location}
      description={description}
      onViewMore={onViewMore}
      badges={
        <>
          {formattedReward && (
            <S.RewardInfo aria-label={`Recompensa de ${formattedReward}`}>
              {formattedReward}
            </S.RewardInfo>
          )}
          {statusInfo && (
            <StatusContainer $color={statusInfo.fontColor} $background={statusInfo.backgroundColor}>
              {statusInfo.text}
            </StatusContainer>
          )}
        </>
      }
    />
  )
}

export default AnimalPostSummaryCard
