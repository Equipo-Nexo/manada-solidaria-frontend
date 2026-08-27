import { donationItems, type DonationItem } from '@/campaigns/app/types/Campaign.types'
import { donationItemLabels } from '@/campaigns/utils/CampaignUtils'
import { DonationItemIcon } from '@/common/icons'
import * as S from './DonationItems.styles'

type DonationItemsProps = {
  items?: ReadonlyArray<{ category: DonationItem }>
}

function DonationItems({ items }: DonationItemsProps) {
  if (!items?.length) return null

  const selectedCategories = new Set(items.map(({ category }) => category))

  return (
    <S.Container>
      <S.Title>¿Qué se desea recolectar?</S.Title>
      <S.Grid>
        {[0, 2, 4].map((rowStart) => (
          <S.Row key={rowStart}>
            {donationItems.slice(rowStart, rowStart + 2).map((category) => {
              const selected = selectedCategories.has(category)

              return (
                <S.Item key={category} $selected={selected}>
                  <DonationItemIcon variant={category} aria-hidden="true" />
                  <span>{donationItemLabels[category]}</span>
                </S.Item>
              )
            })}
          </S.Row>
        ))}
      </S.Grid>
    </S.Container>
  )
}

export default DonationItems
