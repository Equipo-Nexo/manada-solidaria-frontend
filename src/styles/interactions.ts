import { css } from 'styled-components'

export const softInteractiveHover = css`
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryHoverSoft};
    color: ${({ theme }) => theme.colors.brand};
  }
`
