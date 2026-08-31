import { donationItems, type DonationItem } from '@/campaigns/app/types/Campaign.types'
import { donationItemLabels } from '@/campaigns/utils/CampaignUtils'
import * as S from './DonationItems.styles'
import DonationItemIcon from '@/campaigns/utils/DonationItemIcon'

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
        {donationItems.map((category) => {
          const selected = selectedCategories.has(category)

          return (
            <S.Item key={category} $selected={selected} >

              <DonationItemIcon variant={category} aria-hidden="true" />
              <S.DonationItemName $selected={selected}>{donationItemLabels[category]}</S.DonationItemName>

            </S.Item>
          )
        })}
      </S.Grid>
    </S.Container>
  )
}

export default DonationItems
