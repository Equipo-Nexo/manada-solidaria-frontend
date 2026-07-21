import { CircleX } from '../icons'
import * as S from '../inputs/Inputs.styles'

interface FormErrorMessageProps {
  id?: string
  message?: string
}

function FormErrorMessage({ id, message }: FormErrorMessageProps) {
  if (!message) return null

  return (
    <S.FormErrorMessage id={id} role="alert">
      <CircleX aria-hidden="true" />
      <span>{message}</span>
    </S.FormErrorMessage>
  )
}

export default FormErrorMessage
