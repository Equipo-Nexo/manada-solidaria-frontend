import styled from 'styled-components'
import * as AnimalCard from '@/common/components/animalPostCard/animalPostCard.styles'
import type { CampaignCategory } from '@/campaigns/app/types/Campaign.types'
import { campaignCategoryColors } from '@/campaigns/utils/CampaignUtils'

export {
  ViewMore,
} from '@/common/components/animalPostCard/animalPostCard.styles'

export const CardContainer = styled(AnimalCard.CardContainer)<{ $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: auto;
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
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

export const CategoryBadge = styled(AnimalCard.StatusContainer).attrs<{ $campaignType?: CampaignCategory }>(({ theme, $campaignType }) => ({
  $color: $campaignType && campaignCategoryColors[$campaignType]
    ? theme.colors.background
    : theme.colors.secondary,
  $background: ($campaignType && campaignCategoryColors[$campaignType]) || theme.colors.neutral,
}))``

export const Title = styled(AnimalCard.Title)`
  min-width: 0;
`

