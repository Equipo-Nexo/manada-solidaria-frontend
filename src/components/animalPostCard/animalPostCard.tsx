import { MapPin, Share } from '../icons'
import { getAnimalPostActions } from './animalPostActions'
import type { AnimalPostActionId } from './animalPostActions'
import * as S from './animalPostCard.styles'
import type { AnimalPostStatus } from './animalPostCard.styles'

export type AnimalPostCardProps = {
  name?: string
  status?: AnimalPostStatus
  location?: string
  description?: string
  imageUrl?: string
  contactPhone?: string
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
  onShare,
  onViewMore,
  actionHandlers,
}: AnimalPostCardProps) {
  const visibleActions = status ? getAnimalPostActions(status, contactPhone) : []

  return (
    <S.CardContainer>
      <S.PhotoContainer>
        <S.Photo src={imageUrl} alt={name} />
        <S.ShareButton type="button" aria-label={`Compartir publicación de ${name}`} onClick={onShare}>
          <Share aria-hidden="true" />
        </S.ShareButton>
      </S.PhotoContainer>

      <S.Content>
        <S.MainInfoContainer>
          <S.Title>{name}</S.Title>
          {status && <S.StatusContainer $status={status}>{status}</S.StatusContainer>}
        </S.MainInfoContainer>

        <S.Location>
          <MapPin aria-hidden="true" />
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