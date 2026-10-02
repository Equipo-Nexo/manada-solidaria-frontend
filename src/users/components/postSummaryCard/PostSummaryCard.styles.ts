import styled from 'styled-components'
import * as AnimalCard from '@/common/components/animalPostCard/animalPostCard.styles'

export {
  ViewMore,
} from '@/common/components/animalPostCard/animalPostCard.styles'

export const CardContainer = styled(AnimalCard.CardContainer)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: auto;
  cursor: default;
`

export const Content = styled(AnimalCard.Content)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows:
    ${({ theme }) => theme.typography.header1.lineHeight}
    ${({ theme }) => theme.typography.body.lineHeight}
    calc(${({ theme }) => theme.typography.body.lineHeight} * 2)
    calc(${({ theme }) => theme.typography.body.lineHeight} + 7px);
  flex: 0 0 auto;

  & > * {
    grid-column: 1;
    min-width: 0;
  }

  & > button {
    grid-row: 4;
    justify-self: start;
  }
`

export const PhotoContainer = styled(AnimalCard.PhotoContainer)`
  width: 100%;
  aspect-ratio: ${({ theme }) => theme.layout.publicationImageAspectRatio};
  flex-shrink: 0;

  & > div {
    position: absolute;
    inset: 0;
  }
`

export const Location = styled(AnimalCard.Location)`
  grid-row: 2;
`

export const Description = styled(AnimalCard.Description)`
  grid-row: 3;
  min-height: 0;
`

export const MainInfoContainer = styled(AnimalCard.MainInfoContainer)`
  grid-row: 1;
  flex-wrap: nowrap;
  align-items: center;
  gap: 8px;

`

export const BadgesContainer = styled(AnimalCard.BadgesContainer)`
  min-width: 0;
  max-width: 100%;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
`

export const StatusContainer = styled(AnimalCard.StatusContainer)`
  white-space: nowrap;
`

export const CategoryBadge = styled(AnimalCard.StatusContainer).attrs(({ theme }) => ({
  $color: theme.colors.secondary,
  $background: theme.colors.neutral,
}))``

export const Title = styled(AnimalCard.Title)`
  min-width: 0;
`

