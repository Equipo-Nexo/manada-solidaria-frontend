import { cloneElement, type SVGProps } from 'react'
import AnimalFood from '../../common/icons/AnimalFood'
import Bed from '../../common/icons/Bed'
import Bone from '../../common/icons/Bone'
import Ellipsis from '../../common/icons/Ellipsis'
import Medicine from '../../common/icons/Medicine'
import TShirt from '../../common/icons/T-shirt'

export type DonationItemIconVariant =
  | 'FOOD'
  | 'MEDICINE'
  | 'SHELTER_AND_BEDDING'
  | 'TOYS_AND_ACCESSORIES'
  | 'CLOTHING_AND_BLANKETS'
  | 'OTHER'

type DonationItemIconProps = SVGProps<SVGSVGElement> & {
  variant: DonationItemIconVariant
}

const icons = {
  FOOD: AnimalFood,
  MEDICINE: Medicine,
  SHELTER_AND_BEDDING: Bed,
  TOYS_AND_ACCESSORIES: Bone,
  CLOTHING_AND_BLANKETS: TShirt,
  OTHER: Ellipsis,
}

function DonationItemIcon({ variant, ...props }: DonationItemIconProps) {
  const Icon = icons[variant]

  return cloneElement(Icon(), props)
}

export default DonationItemIcon
