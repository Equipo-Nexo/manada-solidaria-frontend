import { Info } from '../icons'
import * as S from './AdviceComponent.styles'

interface AdviceComponentProps {
  advice: string
}

function AdviceComponent({ advice }: AdviceComponentProps) {
  return (
    <S.Container>
      <S.Icon><Info aria-hidden="true" /></S.Icon>
      <div>
        <S.Title>Consejo</S.Title>
        <S.Description>{advice}</S.Description>
      </div>
    </S.Container>
  )
}

export default AdviceComponent
