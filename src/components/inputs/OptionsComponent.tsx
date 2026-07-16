import { Check } from '../icons'
import * as S from './Inputs.styles'

interface OptionsComponentProps<T extends string> {
  name?: string
  title: string
  description: string
  value: T
  selected: boolean
  onSelect?: (value: T) => void
}

function OptionsComponent<T extends string>({
  name,
  title,
  description,
  value,
  selected,
  onSelect,
}: OptionsComponentProps<T>) {
  return (
    <S.OptionLabel $selected={selected} data-selected={selected}>
      <S.RadioInput
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={() => onSelect?.(value)}
        readOnly={!onSelect}
      />
      <S.OptionItem>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.OptionItem>
      <S.SelectionIndicator aria-hidden="true">
        {selected && <Check />}
      </S.SelectionIndicator>
    </S.OptionLabel>
  )
}

export default OptionsComponent
