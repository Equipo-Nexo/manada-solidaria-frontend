import { WorkInProgress } from '../../common/components'
import * as S from './Services.styles'

export default function Services() {
  return (
    <S.Container>
      <WorkInProgress
        title="Estamos preparando los servicios"
        description="Pronto vas a poder encontrar profesionales y servicios para cuidar a los animales de la Manada."
      />
    </S.Container>
  )
}
