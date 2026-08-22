import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Advice, OptionsComponent, PhoneInputComponent, ErrorMessage, ImageUpload, SelectorComponent, AutocompleteGeolocation } from '@components/index.ts'
import { editAnimalPostSchema, type EditAnimalPostFormValues } from '@animals/app/schemas/EditAnimalPost.schema'
import * as S from './EditAnimalPost.styles'
import { animalAgeLabels, animalSexLabels, type AnimalPostFilter } from '@animals/app/types/AnimalPost.types'
import { useEditAnimalPostMutation, useGetAnimalPostQuery } from '@animals/app/api/animalPostsApi'
import type { EditAnimalPostRequest } from '@animals/app/api/requests/animalPostRequests'
import type { AnimalPostResponse } from '@animals/app/api/responses/animalPostResponses'
import { useToast } from '@hooks/toast/useToast'
import { PublicationReason } from '@/animals/utils/CreateAnimalPostRequestBuilder'
import { recordToOptions } from '@common/utils/RecordToOptions'
import { animalSize } from '@animals/utils/AnimalFormUtils'
import { ColorSelectorComponent } from '@animals/components'
import { mapGeolocationToLocation } from '@utils/mapGeolocationToLocation'
import FormContainer from '@/common/components/form_container/FormContainer'
import { scrollToFirstFormError } from '@utils/scrollToFirstFormError'

const getPublicationReason = (type: AnimalPostFilter): PublicationReason => {
    if (type === 'IN_STREET') return PublicationReason.Street
    if (type === 'LOST') return PublicationReason.Lost
    return PublicationReason.Adoption
}

const EditAnimalPostDefaultValues = (
    animalPost: AnimalPostResponse,
): EditAnimalPostFormValues => {
    return {
        publicationReason: getPublicationReason(animalPost.type),
        imageId: animalPost.imageUrl,
        animalSex: animalPost.animal.gender,
        animalAge: animalPost.animal.age,
        animalSize: animalPost.animal.size,
        color: animalPost.animal.color,
        name: animalPost.name ?? '',
        areaCode: animalPost.phoneNumber ? animalPost.phoneNumber.areaCode : '',
        phoneNumber: animalPost.phoneNumber ? animalPost.phoneNumber.areaCode : '',
        story: animalPost.description,
        location: animalPost.location,
    }
}

function EditAnimalPostForm() {
    
    const toast = useToast()
    const navigate = useNavigate()
    const { postId } = useParams<{ postId: string }>()
    
    const [editAnimalPost, { isLoading }] = useEditAnimalPostMutation()
    const { data: animalPostData } = useGetAnimalPostQuery(postId || '', { skip: !postId })

    const defaultValues = useMemo(
        () => animalPostData && EditAnimalPostDefaultValues(animalPostData),
        [animalPostData],
    )

    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<EditAnimalPostFormValues>({
        resolver: yupResolver(editAnimalPostSchema),
        mode: 'onTouched',
        values: defaultValues,
    })

    const publicationReason = defaultValues?.publicationReason ?? PublicationReason.Adoption
    const { field: areaCodeField, fieldState: areaCodeState } = useController({
        control,
        name: 'areaCode',
    })
    const { field: phoneNumberField, fieldState: phoneNumberState } = useController({
        control,
        name: 'phoneNumber',
    })

    const handleEditAnimalPost = async (values: EditAnimalPostFormValues) => {
        console.log(values)
        if (!postId || !animalPostData) return
        const phoneNumber = (!values.areaCode || !values.phoneNumber) ? undefined : {
            areaCode: values.areaCode,
            number: values.phoneNumber
        }
        const request: EditAnimalPostRequest = {
            name: values.name.trim() || null,
            description: values.story.trim(),
            imageId: values.imageId,
            animal: {
                id: animalPostData.animal.id,
                type: animalPostData.animal.type,
                size: values.animalSize,
                gender: values.animalSex,
                age: values.animalAge,
                color: values.color,
            },
            location: values.location,
            phoneNumber: phoneNumber,
            reward: animalPostData.reward,
        }

        editAnimalPost({ postId, body: request })
            .unwrap()
            .then(() => {
                navigate(`/editar/exito`, {
                    state: {
                        imageUrl: values.imageId,
                        name: values.name ? values.name.trim() : 'de tu animal',
                        onDetailRedirect: `/detalle/${postId}`
                    },
                })
            }).catch((error) => {
                console.log(error)
                toast.error('No pudimos actualizar la publicación', 'Revisá los datos e intentá nuevamente.')
            })
    }

    return (
        <FormContainer
            pageTitle='Editar post de animal'
            buttonText='Guardar cambios'
            isLoadingForm={isLoading}
            loadingButtonText='Guardando...'
            handleSubmit={handleSubmit(handleEditAnimalPost, scrollToFirstFormError)}        
        >
            <S.FieldGroup>
                <Controller
                    name="imageId"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <ImageUpload
                                imageUrl={field.value}
                                onImageSelected={(imageId) => field.onChange(imageId)}
                            />
                            <ErrorMessage id="photo-error" message={fieldState.error?.message} />
                        </>
                    )}
                />
            </S.FieldGroup>
            <Advice
                advice={"Una buena foto hace la diferencia. Procurá que se vea el animal completo, con buena luz y sin filtros."}
            />
            <S.FieldGroup>
                <S.Label>Ubicación</S.Label>
                <Controller
                    name="location"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <AutocompleteGeolocation
                                initialLocation={field.value}
                                placeHolder="¿En dónde se encuentra el animal?"
                                onChange={(value) =>
                                    field.onChange(value ? mapGeolocationToLocation(value) : undefined)
                                }
                            />
                            <ErrorMessage message={fieldState.error?.message} />
                        </>
                    )}
                />
            </S.FieldGroup>
            <S.FieldGroup>
                <S.Label>Nombre</S.Label>
                <S.Input
                    placeholder={defaultValues?.name ? '' : 'Si no lo sabés, podés dejarlo vacío'}
                    aria-invalid={Boolean(errors.name)}
                    {...register('name')}
                />
                <ErrorMessage message={errors.name?.message} />
            </S.FieldGroup>
            <S.FieldGroup>
                <S.Label>Sexo y edad <S.Required>*</S.Required></S.Label>
                <S.CompactSelectorsContainer>
                    <Controller
                        name="animalSex"
                        control={control}
                        render={({ field, fieldState }) => (
                            <SelectorComponent
                                name={field.name}
                                ariaLabel="Sexo"
                                placeholder="Seleccioná uno"
                                options={recordToOptions(animalSexLabels)}
                                value={field.value}
                                error={fieldState.error?.message}
                                errorId="animal-sex-error"
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                inputRef={field.ref}
                            />
                        )}
                    />
                    <Controller
                        name="animalAge"
                        control={control}
                        render={({ field, fieldState }) => (
                            <SelectorComponent
                                name={field.name}
                                ariaLabel="Edad"
                                placeholder="Seleccioná uno"
                                options={recordToOptions(animalAgeLabels)}
                                value={field.value}
                                error={fieldState.error?.message}
                                errorId="animal-age-error"
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                inputRef={field.ref}
                            />
                        )}
                    />
                </S.CompactSelectorsContainer>
            </S.FieldGroup>
            <S.FieldGroup>
                <S.Label id="animal-size-label">Tamaño del animal <S.Required>*</S.Required></S.Label>
                <Controller
                    name="animalSize"
                    control={control}
                    render={({ field, fieldState }) => (
                        <>
                            <S.OptionsGroup
                                role="radiogroup"
                                aria-labelledby="animal-size-label"
                                aria-describedby={fieldState.error ? 'animal-size-error' : undefined}
                                aria-invalid={Boolean(fieldState.error)}
                            >
                                {animalSize.map((size) => (
                                    <OptionsComponent
                                        key={size.value}
                                        name={field.name}
                                        title={size.title}
                                        description={size.description}
                                        value={size.value}
                                        selected={field.value === size.value}
                                        onSelect={field.onChange}
                                    />
                                ))}
                            </S.OptionsGroup>
                            <ErrorMessage id="animal-size-error" message={fieldState.error?.message} />
                        </>
                    )}
                />
            </S.FieldGroup>
            <S.FieldGroup>
                <S.Label>Color predominante</S.Label>
                <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                        <ColorSelectorComponent
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                        />
                    )}
                />
            </S.FieldGroup>
            <S.FieldGroup>
                <S.Label>
                    Número de teléfono
                    {publicationReason !== PublicationReason.Street && <S.Required> *</S.Required>}
                </S.Label>
                <PhoneInputComponent
                    areaCodeValue={areaCodeField.value}
                    phoneNumberValue={phoneNumberField.value}
                    onAreaCodeChange={areaCodeField.onChange}
                    onPhoneNumberChange={phoneNumberField.onChange}
                    onAreaCodeBlur={areaCodeField.onBlur}
                    onPhoneNumberBlur={phoneNumberField.onBlur}
                    areaCodeRef={areaCodeField.ref}
                    phoneNumberRef={phoneNumberField.ref}
                    areaCodePlaceholder={defaultValues?.areaCode ? '' : '353'}
                    phoneNumberPlaceholder={defaultValues?.phoneNumber ? '' : '5652355'}
                    error={areaCodeState.error?.message ?? phoneNumberState.error?.message}
                />
                <S.Suggestion>
                    {publicationReason === PublicationReason.Street
                        ? 'Es opcional si el animal se encuentra en la calle'
                        : 'Es obligatorio para que adoptantes o colaboradores puedan contactarte'}
                </S.Suggestion>
            </S.FieldGroup>
            <S.FieldGroup>
                <S.Label>Contanos su historia <S.Required>*</S.Required></S.Label>
                <S.TextArea
                    placeholder=""
                    {...register('story')} />
                <ErrorMessage message={errors.story?.message} />
            </S.FieldGroup>
        </FormContainer>
    )
}

export default EditAnimalPostForm
