import { BottomSheet } from '@/common/components'
import * as S from './AnimalPostStatusSheet.styles'
import { Check } from '@/common/icons'


interface Button {
    label: string
    handleClick: () => void
}

interface PossibleStatus {
    title: string,
    description: string,
    backendValue: string,
    isFinalStatus: boolean,
    primaryButton: Button,
    secondaryButton: Button
}

interface CurrentStatus {
    label: string,
    color: string,
    backendValue: string

}

interface UpdatePostStatusSheet {
    bottomSheetTitle: string,
    bottomSheetDescription: string,
    currentStatus: CurrentStatus,
    possibleStatus: PossibleStatus[],
    onClose: () => void,
    onChangeStatus: (status: string) => void

}


function UpdatePostStatusSheet(props: UpdatePostStatusSheet) {

    const totalPossibleStatus = props.possibleStatus.length;

    const onChangeStatus = (status: string) => {
        return status;
    }

    return (
        <BottomSheet isOpen ariaLabel="Confirmar cambio de estado" onClose={props.onClose}>
            <S.Content tabIndex={-1}>
                <S.Title>{props.bottomSheetTitle}</S.Title>
                <S.Description>
                    {props.bottomSheetDescription}
                </S.Description>
                {totalPossibleStatus === 1 &&
                    props.possibleStatus.map((status) => (
                        < S.Actions key={status.title}>
                            <S.ActionButton $primary onClick={() => onChangeStatus(status.backendValue)} >
                                {status.primaryButton.label}
                            </S.ActionButton>
                            <S.ActionButton $primary={false} onClick={() => props.onClose()} >
                                {status.secondaryButton.label}
                            </S.ActionButton>
                        </S.Actions>
                    ))
                }
                {totalPossibleStatus > 1 &&
                    <S.Options aria-label="Estados de la publicación">
                        {props.possibleStatus.map((option) => {
                            const selected = option.backendValue === props.currentStatus.backendValue;
                            return (
                                <S.Option
                                    key={option.title}
                                    type="button"
                                    $selected={selected}
                                    aria-pressed={selected}
                                    onClick={() => onChangeStatus(option.backendValue)}
                                >
                                    <S.OptionText>
                                        <S.OptionLabel>{option.title}</S.OptionLabel>
                                        <S.OptionDescription>{option.description}</S.OptionDescription>
                                    </S.OptionText>
                                    <S.CheckCircle $selected={selected} aria-hidden="true"><Check /></S.CheckCircle>
                                </S.Option>
                            )
                        })}
                    </S.Options>
                }
            </S.Content >
        </BottomSheet >

    )
}
export default UpdatePostStatusSheet;