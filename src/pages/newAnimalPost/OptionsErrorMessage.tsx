import { CircleX } from '../../components/icons'
import * as S from './newAnimalPostForm.styles'

interface OptionsErrorMessageProps {
  id: string
  message?: string
}

function OptionsErrorMessage({ id, message }: OptionsErrorMessageProps) {
  if (!message) return null

  return (
    <S.OptionsErrorMessage id={id} role="alert">
      <CircleX aria-hidden="true" />
      <span>{message}</span>
    </S.OptionsErrorMessage>
  )
}

export default OptionsErrorMessage
