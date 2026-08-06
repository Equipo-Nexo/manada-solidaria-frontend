import * as S from '@animals/pages/create_animal_post/CreateAnimalPost.styles'
import type { AnimalType } from "../app/types/AnimalPost.types"
import type { AnimalSelectorOption } from "../utils/AnimalFormUtils"

export function AnimalSelectorComponent({
  options,
  selected,
  errorId,
  hasError = false,
  onSelect,
}: {
  options: ReadonlyArray<AnimalSelectorOption>
  selected?: AnimalType
  errorId?: string
  hasError?: boolean
  onSelect: (type: AnimalType) => void
}) {
  return (
    <S.AnimalItemContainer
      role="radiogroup"
      aria-label="Tipo de animal"
      aria-describedby={hasError ? errorId : undefined}
      aria-invalid={hasError}
    >
      {options.map((animal) => (
        <S.AnimalItem
          key={animal.value}
          type="button"
          role="radio"
          aria-checked={selected === animal.value}
          $selected={selected === animal.value}
          onClick={() => onSelect(animal.value)}
        >
          <S.AnimalImage src={animal.imageSrc} alt="" />
          <S.AnimalTitle>{animal.label}</S.AnimalTitle>
        </S.AnimalItem>
      ))}
    </S.AnimalItemContainer>
  )
}