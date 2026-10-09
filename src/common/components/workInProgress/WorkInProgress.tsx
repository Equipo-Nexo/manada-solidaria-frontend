import { PawPrint } from '../../icons'
import * as S from './WorkInProgress.styles'

type WorkInProgressProps = {
  title?: string
  description?: string
}

function WorkInProgress({
  title = 'Estamos trabajando en esto',
  description = 'Muy pronto vas a poder disfrutar de esta sección.',
}: WorkInProgressProps) {
  return (
    <S.Container role="status" aria-live="polite">
      <S.Illustration aria-hidden="true">
        <S.Orbit />
        <S.PawBadge>
          <PawPrint />
        </S.PawBadge>
        <S.Dot $position="top" />
        <S.Dot $position="bottom" />
      </S.Illustration>

      <S.Content>
        <S.Eyebrow>Próximamente</S.Eyebrow>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.Content>
    </S.Container>
  )
}

export default WorkInProgress
