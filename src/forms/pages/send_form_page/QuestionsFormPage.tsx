import { ArrowLeft, Building, Dog, DollarSign, Garden, HandHeart, House, PawPrint, File, Users, MessageSquare, Heart, Phone } from '@/common/icons';
import * as S from './QuestionesFormPage.styles';
import { useNavigate } from 'react-router-dom';
import { adoptionFormMock } from './MockedQuestionsResponse';
import { AdoptionQuestionsMock } from '../../utils/AdoptionQuestionsMocked';
import type { ReactElement } from 'react';
import { useToast } from '@hooks/toast/useToast';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAdoptionFormSchema, type AdoptionFormValues } from '../../app/schemas/adoptionFormSchema';
import type { AdoptionFormRequest, AdoptionQuestion } from '../../app/types/AdoptionForm.types';
import { scrollToFirstFormError } from '@utils/scrollToFirstFormError';
import { InputSelector } from './AdoptionQuestionInputs';

interface QuestionsFormPageProps {
    onSubmit?: (submission: AdoptionFormRequest) => void | Promise<void>;
}

const response = adoptionFormMock;

const schema = createAdoptionFormSchema(response);

function QuestionsFormPage({ onSubmit }: QuestionsFormPageProps) {

    const navigate = useNavigate();

    const toast = useToast();

    const form = useForm<AdoptionFormValues>({
        defaultValues: {
            answers: Object.fromEntries(response.flatMap(({ questions }) => questions.map(({ id }) => [id, '']))),
            adoptionReason: '',
            phoneNumber: { areaCode: '', number: '' },
        },
        resolver: yupResolver(schema),
        mode: 'onTouched',
    });

    const { handleSubmit, formState: { isSubmitting } } = form;

    const handleFormSubmit = async (values: AdoptionFormValues) => {
        const request: AdoptionFormRequest = {
            answers: response.flatMap((category) => category.questions.map((question) => ({
                categoryId: category.id,
                questionId: question.id,
                value: values.answers[question.id] ?? '',
            }))),
            adoptionReason: values.adoptionReason,
            phoneNumber: { ...values.phoneNumber },
        };
        try {
            await onSubmit?.(request);
        } catch {
            toast.error('No pudimos enviar el formulario', 'Intentá nuevamente.');
        }
    };

    const iconsMap: Map<string, ReactElement> = new Map([
        ['Home', <House />],
        ['Building', <Building />],
        ['Dog', <Dog />],
        ['Garden', <Garden />],
        ['Users', <Users />],
        ['PawPrint', <PawPrint />],
        ['File', <File />],
        ['HandHeart', <HandHeart />],
        ['DollarSign', <DollarSign />],
        ['MessageSquare', <MessageSquare />],
        ['Heart', <Heart />],
        ['Phone', <Phone />],
    ]);

    const QuestionStructure = (question: AdoptionQuestion) => {
        return (
            <S.Question key={question.id}>
                <S.QuestionIcon aria-hidden="true">
                    {iconsMap.get(question.iconName)}
                </S.QuestionIcon>
                <S.QuestionContent>
                    <S.QuestionLabel
                        as={question.type === 'PHONE' ? 'span' : 'label'}
                        htmlFor={question.type === 'PHONE' ? undefined : question.id}
                    >
                        {question.title}
                        {question.required && <> <S.RequiredMark aria-hidden="true">*</S.RequiredMark></>}
                    </S.QuestionLabel>
                    <InputSelector question={question} />
                </S.QuestionContent>
            </S.Question>
        )
    }

    return (
        <S.MainContainer>
            <S.Header>
                <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
                    <ArrowLeft aria-hidden="true" />
                </S.BackButton>
            </S.Header>
            <S.SecondaryContainer>
                <S.AppLogo src="/logo.svg" alt="Manada Solidaria" />
                <S.LogoSubtitle>Manada Solidaria</S.LogoSubtitle>
                <S.Title>Formulario de adopción</S.Title>
            </S.SecondaryContainer>
            <FormProvider {...form}>
                <S.Form
                    onSubmit={handleSubmit(handleFormSubmit, scrollToFirstFormError)}
                    aria-busy={isSubmitting}
                    noValidate
                >
                    {response.map((category, categoryIndex) => (
                        <S.CategoryContainer key={category.id}>
                            <S.CategoryTitle>{category.category}</S.CategoryTitle>
                            <S.CategoryDescription>{category.description}</S.CategoryDescription>
                            <S.QuestionsContainer>
                                {category.questions.map((question) => (
                                    QuestionStructure(question)
                                ))}
                                {categoryIndex === response.length - 1 && AdoptionQuestionsMock.map(QuestionStructure)}
                            </S.QuestionsContainer>
                        </S.CategoryContainer>
                    ))}
                    <S.FormActionsContainer>
                        <S.ActionButton type="button" $variant="cancel" onClick={() => navigate(-1)} disabled={isSubmitting}>
                            Cancelar
                        </S.ActionButton>
                        <S.ActionButton type="submit" $variant="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Enviar'}
                        </S.ActionButton>
                    </S.FormActionsContainer>
                </S.Form>
            </FormProvider>
        </S.MainContainer>

    )
}

export default QuestionsFormPage;
