import * as S from '@animals/pages/create_animal_post/CreateAnimalPost.styles'
import type { AnimalColor } from '../app/types/AnimalPost.types'
import { colors } from '@animals/utils/AnimalFormUtils'
import { ColorPalet } from '@/common/icons'

export default function ColorSelectorComponent({ selected, onSelect }: {
  selected?: AnimalColor
  onSelect: (color: AnimalColor) => void
}) {
  return (
    <S.ColorsContainer role="radiogroup" aria-label="Color predominante">
      {colors.map(({ value, label, hex }) => (
        <S.ColorItem key={value}>
          <S.Color
            $color={hex}
            $selected={selected === value}
            role="radio"
            aria-checked={selected === value}
            aria-label={label}
            onClick={() => onSelect(value)}
          >
            {value === "OTHER" && <ColorPalet aria-hidden="true" />}
          </S.Color>
          <S.ColorName $selected={selected === value}>{label}</S.ColorName>
        </S.ColorItem>
      ))}
    </S.ColorsContainer>
  )
}