import perroImage from '../../components/images/Perro.png'
import gatoImage from '../../components/images/Gato.png'
import otroImage from '../../components/images/Otro.png'
import * as S from './newAnimalPostForm.styles'

export type AnimalType = 'DOG' | 'CAT' | 'OTHER'

const animalKinds: Array<{ value: AnimalType; label: string; imageSrc: string }> = [
  { value: 'DOG', label: 'Perro', imageSrc: perroImage },
  { value: 'CAT', label: 'Gato', imageSrc: gatoImage },
  { value: 'OTHER', label: 'Otro', imageSrc: otroImage },
]

interface AnimalSelectorProps {
  amount: number
  selected?: AnimalType
  errorId?: string
  hasError?: boolean
  onSelect: (type: AnimalType) => void
}

function AnimalSelectorComponent({
  amount,
  selected,
  errorId,
  hasError = false,
  onSelect,
}: AnimalSelectorProps) {
  return (
    <S.AnimalItemContainer
      role="radiogroup"
      aria-label="Tipo de animal"
      aria-describedby={hasError ? errorId : undefined}
      aria-invalid={hasError}
    >
      {animalKinds.slice(0, amount).map((animal) => (
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

export default AnimalSelectorComponent
