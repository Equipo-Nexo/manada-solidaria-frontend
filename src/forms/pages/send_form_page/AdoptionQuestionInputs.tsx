import { useController, useFormContext, useWatch } from 'react-hook-form';
import { ErrorMessage, PhoneInputComponent } from '@/common/components';
import type { AdoptionFormValues } from '../../app/schemas/adoptionFormSchema';
import type { AdoptionQuestion } from '../../app/types/AdoptionForm.types';
import * as S from './QuestionesFormPage.styles';

interface AdoptionQuestionInputProps {
    question: AdoptionQuestion;
}

function useAdoptionQuestionField(question: AdoptionQuestion) {
    const { register, control, getFieldState, formState } = useFormContext<AdoptionFormValues>();
    const name = question.id === 'adoption-reason' ? 'adoptionReason' : `answers.${question.id}` as const;
    const value = useWatch({ control, name });
    const error = getFieldState(name, formState).error?.message;

    return {
        error,
        hasValue: Boolean(value),
        fieldProps: {
            id: question.id,
            disabled: formState.isSubmitting,
            'aria-invalid': Boolean(error),
            'aria-describedby': error ? `${question.id}-error` : undefined,
            ...register(name),
        },
    };
}

function TextQuestionInput({ question }: AdoptionQuestionInputProps) {
    const { fieldProps, error } = useAdoptionQuestionField(question);

    return (
        <>
            <S.TextArea {...fieldProps} placeholder={question.placeHolder} />
            <ErrorMessage id={`${question.id}-error`} message={error} />
        </>
    );
}

function SelectQuestionInput({ question }: AdoptionQuestionInputProps) {
    const { fieldProps, error, hasValue } = useAdoptionQuestionField(question);

    return (
        <>
            <S.SelectorContainer>
                <S.Selector {...fieldProps} $hasValue={hasValue}>
                    <option value="">{question.placeHolder}</option>
                    {question.details.map(({ description }) => (
                        <option key={description} value={description}>{description}</option>
                    ))}
                </S.Selector>
                <S.SelectorArrow aria-hidden="true" />
            </S.SelectorContainer>
            <ErrorMessage id={`${question.id}-error`} message={error} />
        </>
    );
}

function PhoneQuestionInput() {
    const { control } = useFormContext<AdoptionFormValues>();
    const { field: areaCode, fieldState: areaCodeState } = useController({ control, name: 'phoneNumber.areaCode' });
    const { field: number, fieldState: numberState } = useController({ control, name: 'phoneNumber.number' });

    return (
        <PhoneInputComponent
            areaCodeValue={areaCode.value}
            phoneNumberValue={number.value}
            onAreaCodeChange={areaCode.onChange}
            onPhoneNumberChange={number.onChange}
            error={areaCodeState.error?.message ?? numberState.error?.message}
            showIcon={false}
        />
    );
}

export function InputSelector({ question }: AdoptionQuestionInputProps) {
    switch (question.type) {
        case 'TEXT':
            return <TextQuestionInput question={question} />;
        case 'SELECTION':
            return <SelectQuestionInput question={question} />;
        case 'PHONE':
            return <PhoneQuestionInput />;
        default:
            return null;
    }
}
