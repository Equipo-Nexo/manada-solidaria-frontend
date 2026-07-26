import { useState } from 'react'
import { NOT_FOUND_IMAGE_URL } from '../../utils/CommonUtils'
import { ANIMAL_POST_STATUS_LABELS } from '../../app/types/AnimalPost.types'
import type { AnimalPostStatus } from '../../app/types/AnimalPost.types'
import { LocationPin, Share } from '../icons'
import { getAnimalPostActions } from './animalPostActions'
import type { AnimalPostActionId } from './animalPostActions'
import * as S from './animalPostCard.styles'

export type AnimalPostCardProps = {
  name?: string
  status?: AnimalPostStatus
  location?: string
  description?: string
  imageUrl?: string
  contactPhone?: string
  reward?: number
  onShare?: () => void
  onViewMore?: () => void
  actionHandlers?: Partial<Record<AnimalPostActionId, () => void>>
}

function AnimalPostCard({
  name,
  status,
  location,
  description,
  imageUrl,
  contactPhone,
  reward,
  onShare,
  onViewMore,
  actionHandlers,
}: AnimalPostCardProps) {
  const [isRewardExpanded, setIsRewardExpanded] = useState(false)
  const visibleActions = status ? getAnimalPostActions(status, contactPhone) : []
  const hasReward =
    status === ANIMAL_POST_STATUS_LABELS.LOST &&
    typeof reward === 'number' &&
    Number.isFinite(reward) &&
    reward > 0
  const formattedReward = hasReward
    ? new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
      }).format(reward)
    : undefined

  return (
    <S.CardContainer>
      <S.PhotoContainer>
        <S.Photo
          src={imageUrl}
          alt={name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = NOT_FOUND_IMAGE_URL;
          }}
        />
        <S.ShareButton type="button" aria-label={`Compartir publicación de ${name}`} onClick={onShare}>
          <Share aria-hidden="true" />
        </S.ShareButton>
      </S.PhotoContainer>

      <S.Content>
        <S.MainInfoContainer>
          <S.Title>{name}</S.Title>
          <S.BadgesContainer>
            {formattedReward && (
              <S.RewardInfo
                type="button"
                $expanded={isRewardExpanded}
                aria-expanded={isRewardExpanded}
                aria-label={
                  isRewardExpanded
                    ? `Ocultar recompensa de ${formattedReward}`
                    : `Mostrar recompensa de ${formattedReward}`
                }
                title={`Se ofrece una recompensa de ${formattedReward}`}
                onClick={() => setIsRewardExpanded((isExpanded) => !isExpanded)}
              >
                <span>{isRewardExpanded ? formattedReward : '$'}</span>
              </S.RewardInfo>
            )}
            {status && (
              <S.StatusContainer $status={status}>
                {status}
              </S.StatusContainer>
            )}
          </S.BadgesContainer>
        </S.MainInfoContainer>

        <S.Location>
          <LocationPin aria-hidden="true" />
          <span>{location}</span>
        </S.Location>

        <S.Description>{description}</S.Description>

        <S.ViewMore type="button" onClick={onViewMore}>
          Ver más información
        </S.ViewMore>

        {visibleActions.length > 0 && (
          <S.ButtonsContainer $amount={visibleActions.length}>
            {visibleActions.map(({ id, label, variant }) => (
              <S.ActionButton
                key={id}
                type="button"
                $variant={variant}
                onClick={actionHandlers?.[id]}
              >
                {label}
              </S.ActionButton>
            ))}
          </S.ButtonsContainer>
        )}
      </S.Content>
    </S.CardContainer>
  )
}

export default AnimalPostCard
