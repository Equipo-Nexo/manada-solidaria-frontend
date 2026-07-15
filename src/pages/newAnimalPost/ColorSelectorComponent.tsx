import * as S from './newAnimalPostForm.styles'

export type AnimalColor = 'GRAY' | 'BLACK' | 'BLONDE' | 'BROWN' | 'WHITE' | 'OTHER'

const colors: Array<{ value: AnimalColor; label: string; hex: string }> = [
  { value: 'GRAY', label: 'Gris', hex: '#8C8C8C' },
  { value: 'BLACK', label: 'Negro', hex: '#1A1A1A' },
  { value: 'BLONDE', label: 'Rubio', hex: '#E9C98D' },
  { value: 'BROWN', label: 'Marrón', hex: '#A0522D' },
  { value: 'WHITE', label: 'Blanco', hex: '#FFFFFF' },
  { value: 'OTHER', label: 'Otro', hex: '#FFFFFF' },
]

interface ColorSelectorProps {
  selected?: AnimalColor
  onSelect: (color: AnimalColor) => void
}

function ColorSelectorComponent({ selected, onSelect }: ColorSelectorProps) {
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
            {value === 'OTHER' && '◉'}
          </S.Color>
          <S.ColorName>{label}</S.ColorName>
        </S.ColorItem>
      ))}
    </S.ColorsContainer>
  )
}

export default ColorSelectorComponent
