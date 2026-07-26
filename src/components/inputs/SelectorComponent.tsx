import type { FocusEventHandler, Ref } from 'react'
import * as S from './Inputs.styles'
import FormErrorMessage from '../errors/ErrorMessage'

export interface SelectorOption<T extends string> {
  value: T
  label: string
}

interface SelectorComponentProps<T extends string> {
  value?: T
  options: ReadonlyArray<SelectorOption<T>>
  placeholder: string
  onChange: (value: T) => void
  onBlur?: FocusEventHandler<HTMLSelectElement>
  inputRef?: Ref<HTMLSelectElement>
  ariaLabel: string
  error?: string
  errorId?: string
  name?: string
}

function SelectorComponent<T extends string>({
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  inputRef,
  ariaLabel,
  error,
  errorId,
  name,
}: SelectorComponentProps<T>) {
  return (
    <S.SelectField>
      <S.Select
        $hasValue={Boolean(value)}
        ref={inputRef}
        name={name}
        aria-label={ariaLabel}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value as T)}
        onBlur={onBlur}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </S.Select>
      <FormErrorMessage id={errorId} message={error} />
    </S.SelectField>
  )
}

export default SelectorComponent
