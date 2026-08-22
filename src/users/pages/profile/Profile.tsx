import { WorkInProgress } from '../../../common/components'
import * as S from './Profile.styles'

export default function Profile() {
  return (
    <S.Container>
      <WorkInProgress
        title="Estamos preparando tu perfil"
        description="Pronto vas a poder administrar tus datos y personalizar tu experiencia en la Manada."
      />
    </S.Container>
  )
}
