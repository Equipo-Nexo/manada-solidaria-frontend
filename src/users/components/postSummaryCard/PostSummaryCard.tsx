import type { ReactNode } from 'react'
import type { Location } from '@/common/app/services/responses/Location'
import { LocationPin } from '@/common/icons'
import ImagePreview from '@/common/components/image_preview/ImagePreview'
import * as S from './PostSummaryCard.styles'

export type PostSummaryCardProps = {
  title?: string
  imageUrl?: string
  location?: Location
  description?: string
  badges?: ReactNode
  onViewMore?: () => void
}

function PostSummaryCard({ title, imageUrl, location, description, badges, onViewMore }: PostSummaryCardProps) {
  return (
    <S.CardContainer>
      <S.PhotoContainer>
        <ImagePreview imageId={imageUrl} alt={title} variant="fill" />
      </S.PhotoContainer>
      <S.Content>
        <S.MainInfoContainer>
          <S.Title>{title}</S.Title>
          {badges && <S.BadgesContainer>{badges}</S.BadgesContainer>}
        </S.MainInfoContainer>
        {location?.name && (
          <S.Location>
            <LocationPin aria-hidden="true" />
            <span>{location.name}</span>
          </S.Location>
        )}
        <S.Description>{description}</S.Description>
        {onViewMore && (
          <S.ViewMore type="button" onClick={onViewMore}>
            Ver más información
          </S.ViewMore>
        )}
      </S.Content>
    </S.CardContainer>
  )
}

export default PostSummaryCard
