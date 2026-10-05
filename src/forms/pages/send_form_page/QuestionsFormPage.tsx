import { ArrowLeft, Building, Dog, DollarSign, Garden, HandHeart, House, PawPrint, File, Users, MessageSquare, Heart, Phone } from '@/common/icons';
import * as S from './QuestionesFormPage.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { AdoptionQuestionsMock } from '../../utils/AdoptionQuestionsMocked';
import type { ReactElement } from 'react';
import { useToast } from '@hooks/toast/useToast';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAdoptionFormSchema, type AdoptionFormValues } from '../../app/schemas/adoptionFormSchema';
import type { AdoptionCategory, AdoptionQuestion } from '../../app/types/AdoptionForm.types';
import type { AdoptionFormRequest } from '../../app/api/requests/AdoptionFormRequest';
import { useCreateAdoptionFormMutation, useGetQuestionsQuery } from '../../app/api/adoptionFormsApi';
import { Loader, Message } from '@/common/components';
import { scrollToFirstFormError } from '@utils/scrollToFirstFormError';
import { InputSelector } from './AdoptionQuestionInputs';

function QuestionsFormPage() {
    const navigate = useNavigate();
    const { data: questions, isLoading, isError, isFetching, refetch } = useGetQuestionsQuery();

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
            {isLoading ? (
                <S.QueryState>
                    <Loader label="Cargando preguntas..." />
                </S.QueryState>
            ) : !questions?.length ? (
                <S.QueryState role="alert">
                    <Message
                        message={isError ? 'No pudimos cargar las preguntas.' : 'No hay preguntas disponibles por el momento.'}
                        iconName="pawPrint"
                    />
                    <S.ActionButton type="button" $variant="cancel" onClick={() => void refetch()} disabled={isFetching}>
                        {isFetching ? 'Reintentando...' : 'Reintentar'}
                    </S.ActionButton>
                </S.QueryState>
            ) : (
                <QuestionsForm response={questions} />
            )}
        </S.MainContainer>
    );
}

function QuestionsForm({ response }: { response: AdoptionCategory[] }) {
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>();
    const [createAdoptionForm] = useCreateAdoptionFormMutation();

    const toast = useToast();
    const schema = createAdoptionFormSchema(response);

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
        if (!postId) {
            toast.error('Seleccioná una publicación', 'Abrí el formulario desde el botón Adoptar.');
            return;
        }

        const request: AdoptionFormRequest = {
            adoptionPostId: postId,
            description: values.adoptionReason,
            phoneNumber: { ...values.phoneNumber },
            answers: response.flatMap((category) => category.questions.map((question) => ({
                questionId: question.id,
                answer: values.answers[question.id] ?? '',
            }))),
        };
        try {
            await createAdoptionForm(request).unwrap();
            navigate(`/formulario-adopcion/enviado/${encodeURIComponent(postId)}`, { replace: true });
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

    )
}

export default QuestionsFormPage;
