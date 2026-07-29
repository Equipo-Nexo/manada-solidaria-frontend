import { AnimalPostStatus } from '../../utils/AnimalPostUtils'
import { NOT_FOUND_IMAGE_URL } from '../../utils/CommonUtils'
import { LocationPin, Share } from '../icons'
import { getAnimalPostActions } from './animalPostActions'
import type { AnimalPostActionId } from './animalPostActions'
import * as S from './animalPostCard.styles'

export type AnimalPostCardProps = {
  name?: string
  status?: string
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
  const visibleActions = status ? getAnimalPostActions(AnimalPostStatus[status], contactPhone) : []

  return (
    <S.CardContainer>
      <S.PhotoContainer>
        <S.Photo 
          src={`${import.meta.env.VITE_CLOUDFLARE_URL}${imageUrl}`} 
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
          {status && <S.StatusContainer 
            $color={AnimalPostStatus[status].fontColor} 
            $background={AnimalPostStatus[status].backgroundColor}
            >{AnimalPostStatus[status].text}</S.StatusContainer>
          }
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