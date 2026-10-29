import { useState } from 'react'
import { BottomSheet } from '@/common/components'
import * as S from './UpdatePostStatusSheet.styles'
import { Check } from '@/common/icons'
import type { PossibleStatus, UpdatePostStatusSheetProps } from './UpdatePostStatusSheet.types'


const ConfirmationSheet = ({ status, onCancel }: { status: PossibleStatus; onCancel: () => void }) => {
    return (
        < S.Actions key={status.title}>
            <S.ActionButton $primary onClick={() => void status.primaryButton.handleClick(status.backendValue)} >
                {status.primaryButton.label}
            </S.ActionButton>
            <S.ActionButton $primary={false} onClick={onCancel} >
                {status.secondaryButton.label}
            </S.ActionButton>
        </S.Actions>

    )
}

const OptionsSheet = ({ option, selected, onSelect }: {
    option: PossibleStatus;
    selected: boolean;
    onSelect: (option: PossibleStatus) => void;
}) => {
    return (
        <S.Option
            key={option.title}
            type="button"
            $selected={selected}
            aria-pressed={selected}
            onClick={() => onSelect(option)}
        >
            <S.OptionText>
                <S.OptionLabel>{option.title}</S.OptionLabel>
                <S.OptionDescription>{option.description}</S.OptionDescription>
            </S.OptionText>
            <S.CheckCircle $selected={selected} aria-hidden="true"><Check /></S.CheckCircle>
        </S.Option>
    )
}

function UpdatePostStatusSheet(props: UpdatePostStatusSheetProps) {

    const [selectedStatus, setSelectedStatus] = useState<PossibleStatus | null>(null);
    const totalPossibleStatus = props.possibleStatus.length;
    const singleStatus = totalPossibleStatus === 1 ? props.possibleStatus[0] : null;
    const needsConfirmation = selectedStatus ?? (singleStatus?.isFinalStatus ? singleStatus : null);

    const handleSelectStatus = (option: PossibleStatus) => {
        if (option.backendValue === props.currentStatus.backendValue) return;
        if (option.isFinalStatus) {
            setSelectedStatus(option);
        } else {
            void option.primaryButton.handleClick(option.backendValue);
        }
    }

    const handleCancelConfirmation = () => {
        if (totalPossibleStatus > 1) {
            setSelectedStatus(null);
        } else {
            needsConfirmation?.secondaryButton.handleClick();
        }
    }

    return (
        <BottomSheet isOpen ariaLabel="Confirmar cambio de estado" onClose={props.onClose}>
            <S.Content tabIndex={-1}>
                <S.Title>{needsConfirmation?.confirmationTitle ?? props.bottomSheetTitle}</S.Title>
                <S.Description>
                    {needsConfirmation?.confirmationDescription ?? props.bottomSheetDescription}
                </S.Description>
                {needsConfirmation ? (
                    <ConfirmationSheet
                        key={needsConfirmation.backendValue}
                        status={needsConfirmation}
                        onCancel={handleCancelConfirmation}
                    />
                ) : (
                    <S.Options aria-label="Estados de la publicación">
                        {props.possibleStatus.map((option) => {
                            const selected = option.backendValue === (selectedStatus?.backendValue ?? props.currentStatus.backendValue);
                            return (
                                <OptionsSheet key={option.backendValue} option={option} selected={selected} onSelect={handleSelectStatus} />
                            )
                        })}
                    </S.Options>
                )}
            </S.Content >
        </BottomSheet >

    )
}
export default UpdatePostStatusSheet;
