import useAuth from '@hooks/auth/useAuth'
import { PawPrint } from '../../icons'
import * as S from './NotFound.styles'

function NotFound() {
  const { isAuthenticated } = useAuth()
  const destination = isAuthenticated ? '/home' : '/login'

  return (
    <S.Container aria-labelledby="not-found-title">
      <S.Illustration aria-hidden="true">
        <S.ErrorCode>404</S.ErrorCode>
        <S.PawBadge>
          <PawPrint />
        </S.PawBadge>
      </S.Illustration>

      <S.Content>
        <S.Eyebrow>Página no encontrada</S.Eyebrow>
        <S.Title id="not-found-title">Parece que esta huella no lleva a ningún lado</S.Title>
        <S.Description>
          La página que buscás no existe, cambió de dirección o ya no está disponible.
        </S.Description>
      </S.Content>

      <S.HomeLink to={destination}>
        Volver al inicio
        <PawPrint aria-hidden="true" />
      </S.HomeLink>
    </S.Container>
  )
}

export default NotFound
