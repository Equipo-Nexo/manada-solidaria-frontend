import { useLocation, useNavigate } from 'react-router-dom'
import { Check, Eye, History } from '../../icons'
import * as S from './UpdateSuccess.styles'

interface UpdateSuccessProps {
  imageUrl?: string
  name: string
  onDetailRedirect: string
}

function UpdateSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { imageUrl, name, onDetailRedirect } = location.state as UpdateSuccessProps

  return (
    <S.Container>
      <S.Content>
        <S.ImageContainer>
          <S.AnimalImage src={`${import.meta.env.VITE_CLOUDFLARE_URL}${imageUrl}`} />
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
          <S.PrimaryButton type="button" onClick={() => navigate('/mis-publicaciones')}>
            <History aria-hidden="true" />
            Volver a mis publicaciones
          </S.PrimaryButton>
          <S.SecondaryButton type="button" onClick={() => navigate(onDetailRedirect)}>
            <Eye aria-hidden="true" />
            Ver detalle de la publicación
          </S.SecondaryButton>
        </S.Actions>
      </S.Content>
    </S.Container>
  )
}

export default UpdateSuccess
