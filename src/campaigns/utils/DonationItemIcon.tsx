import { cloneElement, type SVGProps } from 'react'
import { AnimalFood, Bed, Bone, Ellipsis, Medicine, TShirt } from '@icons/index.ts'

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
