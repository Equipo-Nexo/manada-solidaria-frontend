import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useController, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Publish, Search, Arrow } from '@icons/index.ts'
import { Advice, OptionsComponent, PhoneInputComponent, ErrorMessage, ImageUpload, SelectorComponent } from '@components/index.ts'
import { editAnimalPostSchema, type EditAnimalPostFormValues } from '@animals/app/schemas/EditAnimalPost.schema'
import * as S from './EditAnimalPost.styles'
import { animalAgeLabels, animalSexLabels, type AnimalPostFilter } from '@/animals/app/types/AnimalPost.types'
import { useEditAnimalPostMutation, useGetAnimalPostQuery } from '@animals/app/api/animalPostsApi'
import type { EditAnimalPostRequest } from '@/animals/app/api/requests/animalPostRequests'
import type { AnimalPostResponse } from '@animals/app/api/responses/animalPostResponses'
import { useToast } from '@hooks/toast/useToast'
import { PublicationReason } from '@utils/PublicationReason'
import { recordToOptions } from '@/common/utils/RecordToOptions'
import { animalSize } from '@/animals/utils/AnimalFormUtils'
import { ColorSelectorComponent } from '@/animals/components/ColorSelectorComponent'

const getPublicationReason = (type: AnimalPostFilter): PublicationReason => {
    if (type === 'IN_STREET') return PublicationReason.Street
    if (type === 'LOST') return PublicationReason.Lost
    return PublicationReason.Adoption
}

const EditAnimalPostDefaultValues = (
    animalPost: AnimalPostResponse,
): EditAnimalPostFormValues => {
    const phoneNumber = animalPost.phoneNumber ?? ''
    return {
        publicationReason: getPublicationReason(animalPost.type),
        imageId: animalPost.imageUrl,
        animalSex: animalPost.animal.gender,
        animalAge: animalPost.animal.age,
        animalSize: animalPost.animal.size,
        color: animalPost.animal.color,
        name: animalPost.name ?? '',
        areaCode: phoneNumber.slice(0, -7),
        phoneNumber: phoneNumber.slice(-7),
        story: animalPost.description,
    }
}

const getImagePreviewUrl = (imageUrl?: string) => {
    if (!imageUrl) return undefined
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl
    return `${import.meta.env.VITE_CLOUDFLARE_URL}${imageUrl}`
}



function EditAnimalPostForm() {
    const navigate = useNavigate()
    const { postId } = useParams<{ postId: string }>()
    const toast = useToast()
    const [editAnimalPost, { isLoading }] = useEditAnimalPostMutation()
    const { data: animalPostData } = useGetAnimalPostQuery(postId ?? '', {
        skip: !postId,
    })
    const defaultValues = useMemo(
        () => animalPostData ? EditAnimalPostDefaultValues(animalPostData) : undefined,
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
        if (!postId || !animalPostData) return
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
            location: animalPostData.location,
            phoneNumber: `${values.areaCode}${values.phoneNumber}` || null,
            reward: animalPostData.reward,
        }

        try {
            await editAnimalPost({ postId, body: request }).unwrap()
            navigate(`/editar/animal/${postId}/exito`, {
                replace: true,
                state: {
                    imageUrl: getImagePreviewUrl(values.imageId),
                    name: values.name.trim() || 'de tu animal',
                },
            })
        } catch {
            toast.error('No pudimos actualizar la publicación', 'Revisá los datos e intentá nuevamente.')
        }
    }

    return (
        <S.Page>
            <S.Header>
                <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
                    <Arrow aria-hidden="true" />
                </S.BackButton>
                <S.PageTitle>Editar post de animal</S.PageTitle>
            </S.Header>
            <S.MainContainer
                onSubmit={handleSubmit(handleEditAnimalPost)}
                aria-busy={isLoading}
                noValidate
            >
                <S.FieldGroup>
                    <Controller
                        name="imageId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <ImageUpload
                                    imageUrl={getImagePreviewUrl(field.value)}
                                    label="Seleccionar foto"
                                    ariaDescribedBy={fieldState.error ? 'photo-error' : undefined}
                                    hasError={Boolean(fieldState.error)}
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
                    <S.IconInputWrapper>
                        <Search aria-hidden="true" />
                        <S.Input
                            placeholder={
                                animalPostData?.location.name
                                || animalPostData?.location.address
                                || '¿En dónde se encuentra el animal?'
                            }
                        />
                    </S.IconInputWrapper>
                    <S.MapContainer>
                        <S.MapPlaceholder></S.MapPlaceholder>
                        <S.Suggestion>
                            Buscá una dirección o tocá el mapa para marcar la zona aproximada. Evitá
                            compartir tu dirección exacta.
                        </S.Suggestion>
                    </S.MapContainer>
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
                <S.SubmitButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                    <Publish aria-hidden="true" />
                </S.SubmitButton>
            </S.MainContainer>
        </S.Page>
    )
}

export default EditAnimalPostForm
