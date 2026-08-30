import { useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimalPostStatus } from '@utils/AnimalPostUtils'
import { LocationPin, Share } from '../../icons'
import { getAnimalPostActions } from './animalPostActions'
import * as S from './animalPostCard.styles'
import { ANIMAL_POST_STATUS_LABELS } from '@/animals/utils/AnimalFormUtils'
import type { PhoneNumber } from '@/common/app/services/responses/PhoneNumber'
import type { Location } from '@/common/app/services/responses/Location'
import ImagePreview from '../image_preview/ImagePreview'
import { shareUrl } from '@/common/utils/HandleShare'

export type AnimalPostCardProps = {
  postId: string
  name?: string
  status?: string
  location?: Location
  description?: string
  imageUrl?: string
  phoneNumber?: PhoneNumber
  reward?: number
  onShare?: () => void
  onViewMore?: () => void
}

function AnimalPostCard({
  postId,
  name,
  status,
  location,
  description,
  imageUrl,
  phoneNumber,
  reward
}: AnimalPostCardProps) {
  const navigate = useNavigate()
  const [isRewardExpanded, setIsRewardExpanded] = useState(false)

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

  const visibleActions = status ? getAnimalPostActions(AnimalPostStatus[status].text, phoneNumber) : []

  const handleViewOnMap = (latitude: number, longitude: number) => {
    navigate(`/mapa?latitude=${latitude}&longitude=${longitude}`)
  }

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest('button, a')) return
    navigate(`/animal/detalle/${postId}`)
  }

  const handleShareButton = () => {
    shareUrl({
      path: `?redirect=/animal/detalle/${postId}`,
      text: 'Mirá este animalito para ayudar.'
    })
  }

  return (
    <S.CardContainer onClick={handleCardClick}>
      <S.PhotoContainer>
        <ImagePreview 
          imageId={imageUrl}
          alt={name}
        />
        <S.ShareButton type="button" aria-label={`Compartir publicación de ${name}`} onClick={handleShareButton}>
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
              <S.StatusContainer $color={AnimalPostStatus[status].fontColor} $background={AnimalPostStatus[status].backgroundColor}>
                {AnimalPostStatus[status].text}
              </S.StatusContainer>
            )}
          </S.BadgesContainer>
        </S.MainInfoContainer>

        <S.Location>
          <LocationPin aria-hidden="true" />
          <span>{location?.name}</span>
        </S.Location>

        <S.Description>{description}</S.Description>
        <S.ViewMore type="button" onClick={() => navigate(`/animal/detalle/${postId}`)}>
          Ver más información
        </S.ViewMore>

        {visibleActions.length > 0 && (
          <S.ButtonsContainer $amount={visibleActions.length}>
            {visibleActions.map(({ id, label, variant, onClick }) => (
              <S.ActionButton
                key={id}
                type="button"
                $variant={variant}
                onClick={() =>
                  onClick(
                    phoneNumber,
                    name,
                    location
                      ? () => handleViewOnMap(location.latitude, location.longitude)
                      : undefined
                  )
                }
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
