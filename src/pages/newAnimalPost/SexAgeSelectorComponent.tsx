import * as S from './newAnimalPostForm.styles'

export type AnimalSex = 'MALE' | 'FEMALE' | 'UNKNOWN'
export type AnimalAge = 'PUPPY' | 'ADULT' | 'SENIOR' | 'UNKNOWN'

interface SexAgeSelectorProps {
  sex?: AnimalSex
  age?: AnimalAge
  sexError?: string
  ageError?: string
  onSexChange: (sex: AnimalSex) => void
  onAgeChange: (age: AnimalAge) => void
}

function SexAgeSelectorComponent({
  sex,
  age,
  sexError,
  ageError,
  onSexChange,
  onAgeChange,
}: SexAgeSelectorProps) {
  return (
    <S.SexAgeContainer>
      <S.SelectField>
        <S.Select
          aria-label="Sexo"
          aria-invalid={Boolean(sexError)}
          value={sex ?? ''}
          onChange={(event) => onSexChange(event.target.value as AnimalSex)}
        >
          <option value="" disabled>Seleccioná uno</option>
          <option value="MALE">Macho</option>
          <option value="FEMALE">Hembra</option>
          <option value="UNKNOWN">Desconocido</option>
        </S.Select>
        {sexError && <S.ErrorMessage role="alert">{sexError}</S.ErrorMessage>}
      </S.SelectField>
      <S.SelectField>
        <S.Select
          aria-label="Edad"
          aria-invalid={Boolean(ageError)}
          value={age ?? ''}
          onChange={(event) => onAgeChange(event.target.value as AnimalAge)}
        >
          <option value="" disabled>Seleccioná uno</option>
          <option value="PUPPY">Cachorro</option>
          <option value="ADULT">Adulto</option>
          <option value="SENIOR">Anciano</option>
          <option value="UNKNOWN">Desconocido</option>
        </S.Select>
        {ageError && <S.ErrorMessage role="alert">{ageError}</S.ErrorMessage>}
      </S.SelectField>
    </S.SexAgeContainer>
  )
}

export default SexAgeSelectorComponent
