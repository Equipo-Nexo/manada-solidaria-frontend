import type { InputHTMLAttributes, Ref } from 'react'
import { CarFront, DollarSign, Money } from '../../../components/icons'
import FormErrorMessage from '../../../components/errors/ErrorMessage'
import * as S from './ConditionalSwitchComponent.styles'

interface ConditionalSwitchProps {
  label: string
  variant: 'transport' | 'reward'
  checked: boolean
  onChange: (checked: boolean) => void
  rewardInputProps?: InputHTMLAttributes<HTMLInputElement>
  rewardInputRef?: Ref<HTMLInputElement>
  rewardError?: string
}

function ConditionalSwitchComponent({
  label,
  variant,
  checked,
  onChange,
  rewardInputProps,
  rewardInputRef,
  rewardError,
}: ConditionalSwitchProps) {
  const describedBy = variant === 'transport' ? 'transport-help' : 'reward-input'

  return (
    <S.ConditionalSwitchSection>
      <S.SwitchGroup>
        <S.SwitchRow>
          <S.SwitchLabelContent>
            {variant === 'transport' ? <CarFront aria-hidden="true" /> : <Money aria-hidden="true" />}
            {label}
          </S.SwitchLabelContent>
          <S.SwitchInput
            type="checkbox"
            checked={checked}
            aria-describedby={checked ? describedBy : undefined}
            onChange={(event) => onChange(event.target.checked)}
          />
          <S.SwitchControl aria-hidden="true" />
        </S.SwitchRow>
        {variant === 'transport' && checked && (
          <S.SwitchHelpText id="transport-help" aria-live="polite">
            Si seleccionas esta opción, se enviará una notificación a los transportistas de
            la app para que se comuniquen con vos.
          </S.SwitchHelpText>
        )}
      </S.SwitchGroup>

      {variant === 'reward' && checked && rewardInputProps && (
        <S.RewardField id="reward-input" aria-live="polite">
          <S.RewardInputWrapper>
            <DollarSign aria-hidden="true" />
            <S.RewardInput
              ref={rewardInputRef}
              inputMode="decimal"
              placeholder="Monto de la recompensa"
              aria-invalid={Boolean(rewardError)}
              {...rewardInputProps}
            />
          </S.RewardInputWrapper>
          <FormErrorMessage message={rewardError} />
        </S.RewardField>
      )}
    </S.ConditionalSwitchSection>
  )
}

export default ConditionalSwitchComponent
