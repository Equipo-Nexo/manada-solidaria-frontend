import styled from 'styled-components'
import { MainContainer as BaseMainContainer } from '../newAnimalPost/Form.styles'

export const MainContainer = styled(BaseMainContainer)`
  input,
  select,
  textarea {
    color: ${({ theme }) => theme.colors.black};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.black};
    opacity: 1;
  }
`
