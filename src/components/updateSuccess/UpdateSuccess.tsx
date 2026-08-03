import { Check, Eye, History } from '../icons'
import * as S from './UpdateSuccess.styles'

interface UpdateSuccessProps {
  imageUrl: string
  name: string
  onBack: () => void
  onViewDetails: () => void
}

function UpdateSuccess({ imageUrl, name, onBack, onViewDetails }: UpdateSuccessProps) {
  return (
    <S.Container>
      <S.Content>
        <S.ImageContainer>
          <S.AnimalImage src={imageUrl} alt={name} />
          <S.SuccessBadge aria-hidden="true">
            <Check />
          </S.SuccessBadge>
        </S.ImageContainer>

        <S.Copy>
          <S.Title>¡Cambios guardados!</S.Title>
          <S.Description>
            La información de <S.AnimalName>{name}</S.AnimalName> ha sido actualizada
            correctamente.
          </S.Description>
        </S.Copy>

        <S.Actions>
          <S.PrimaryButton type="button" onClick={onBack}>
            <History aria-hidden="true" />
            Volver a mis publicaciones
          </S.PrimaryButton>
          <S.SecondaryButton type="button" onClick={onViewDetails}>
            <Eye aria-hidden="true" />
            Ver detalle de la publicación
          </S.SecondaryButton>
        </S.Actions>
      </S.Content>
    </S.Container>
  )
}

export default UpdateSuccess
