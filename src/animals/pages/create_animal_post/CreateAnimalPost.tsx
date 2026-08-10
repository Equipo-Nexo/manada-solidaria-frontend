import { yupResolver } from '@hookform/resolvers/yup'
import type { ChangeEvent } from 'react'
import { Controller, useController, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Publish, Search } from '@/common/icons'
import { Map, ImageUpload, Advice, OptionsComponent, PhoneInputComponent, ErrorMessage, SelectorComponent, ConditionalSwitch } from '@components/index.ts'
import { newAnimalPostSchema, type NewAnimalPostFormValues } from '@animals/app/schemas/CreateAnimalPost.schema'
import * as S from './CreateAnimalPost.styles'
import { animalAgeLabels, animalSexLabels } from '@/animals/app/types/AnimalPost.types'
import { buildRequest, PublicationReason } from '@/animals/utils/CreateAnimalPostRequestBuilder'
import { DEFAULT_LOCATION, newAnimalPostDefaultValues } from '@utils/DefaultValues'
import { useCreateAnimalPostMutation } from '@animals/app/api/animalPostsApi'
import type { BaseAnimalPostRequest } from '@/animals/app/api/requests/animalPostRequests'
import { useToast } from '@hooks/toast/useToast'
import Arrow from '@icons/Arrow'
import { formatRewardAmount } from '@utils/rewardAmount'
import { DescriptionComponent, AnimalSelectorComponent, ColorSelectorComponent } from '@animals/components'
import { animalKinds, animalSize } from '@/animals/utils/AnimalFormUtils'
import { recordToOptions } from '@/common/utils/RecordToOptions'
import { publicationReasons } from '@/animals/components/DescriptionComponent'

function CreateAnimalPost() {
  const navigate = useNavigate()
  const toast = useToast()
  const [createAnimalPost, { isLoading }] = useCreateAnimalPostMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    resetField,
  } = useForm<NewAnimalPostFormValues>({
    resolver: yupResolver(newAnimalPostSchema),
    defaultValues: newAnimalPostDefaultValues,
    mode: 'onTouched',
  })

  const selectedReason = useWatch({ control, name: 'publicationReason' })
  const {
    ref: rewardInputRef,
    onChange: onRewardAmountChange,
    ...rewardInputProps
  } = register('rewardAmount')
  const { field: areaCodeField, fieldState: areaCodeState } = useController({
    control,
    name: 'areaCode',
  })
  const { field: phoneNumberField, fieldState: phoneNumberState } = useController({
    control,
    name: 'phoneNumber',
  })

  const handlePublicationReasonChange = (
    value: PublicationReason,
    onChange: (value: PublicationReason) => void,
  ) => {
    onChange(value)
    resetField('needsTransport', { defaultValue: false })
    resetField('offersReward', { defaultValue: false })
    resetField('rewardAmount', { defaultValue: '' })
  }

  const handleRewardAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = formatRewardAmount(event.target.value)
    void onRewardAmountChange(event)
  }

  const handleCreateAnimalPost = async (values: NewAnimalPostFormValues) => {
    const commonRequest: BaseAnimalPostRequest = {
      name: values.name.trim(),
      description: values.story.trim(),
      imageId: values.imageId,
      animal: {
        type: values.animalType,
        size: values.animalSize,
        gender: values.animalSex,
        age: values.animalAge,
        color: values.color,
      },
      phoneNumber: values.phoneNumber,
      location: DEFAULT_LOCATION
    }
      
    createAnimalPost(buildRequest(values, commonRequest))
      .unwrap()
      .then(() => {
        toast.success('Publicación creada', 'El animal fue publicado correctamente.')
        navigate('/home', { replace: true })
      })
      .catch(() => toast.error('No pudimos publicar el animal', 'Revisá los datos e intentá nuevamente.'))
  }

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
          <Arrow aria-hidden="true" />
        </S.BackButton>
        <S.PageTitle>Publicar un animal</S.PageTitle>
      </S.Header>
      <S.MainContainer
        onSubmit={handleSubmit(handleCreateAnimalPost)}
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
                  label="Seleccionar foto"
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
          <S.Label id="publication-reason-label">¿Por qué estás publicando este animal? <S.Required>*</S.Required></S.Label>
          <Controller
            name="publicationReason"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <S.OptionsGroup
                  role="radiogroup"
                  aria-labelledby="publication-reason-label"
                  aria-describedby={fieldState.error ? 'publication-reason-error' : undefined}
                  aria-invalid={Boolean(fieldState.error)}
                >
                  {publicationReasons.map((reason) => (
                    <OptionsComponent
                      key={reason.value}
                      name={field.name}
                      title={reason.title}
                      description={reason.description}
                      value={reason.value}
                      selected={field.value === reason.value}
                      onSelect={(value) => handlePublicationReasonChange(value, field.onChange)}
                    />
                  ))}
                </S.OptionsGroup>
                <ErrorMessage
                  id="publication-reason-error"
                  message={fieldState.error?.message}
                />
              </>
            )}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>Ubicación</S.Label>
          <S.IconInputWrapper>
            <Search aria-hidden="true" />
            <S.Input placeholder="¿En dónde se encuentra el animal?" />
          </S.IconInputWrapper>
          <S.MapContainer>
            <S.MapWrapper >
              <Map onPointSelect={(point) => console.log(point)} />
            </S.MapWrapper>
            <S.Suggestion>
              Buscá una dirección o tocá el mapa para marcar la zona aproximada. Evitá
              compartir tu dirección exacta.
            </S.Suggestion>
          </S.MapContainer>
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>Tipo de animal <S.Required>*</S.Required></S.Label>
          <Controller
            name="animalType"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <AnimalSelectorComponent
                  options={animalKinds}
                  selected={field.value}
                  errorId="animal-type-error"
                  hasError={Boolean(fieldState.error)}
                  onSelect={field.onChange}
                />
                <ErrorMessage id="animal-type-error" message={fieldState.error?.message} />
              </>
            )}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>Nombre</S.Label>
          <S.Input
            placeholder="Si no lo sabés, podés dejarlo vacío"
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
            {selectedReason !== PublicationReason.Street && <S.Required> *</S.Required>}
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
            error={areaCodeState.error?.message ?? phoneNumberState.error?.message}
          />
          <S.Suggestion>
            {selectedReason === PublicationReason.Street
              ? 'Es opcional, sirve para que adoptantes o colaboradores puedan contactarte'
              : 'Es obligatorio para que adoptantes o colaboradores puedan contactarte'}
          </S.Suggestion>
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>Contanos su historia <S.Required>*</S.Required></S.Label>
          <DescriptionComponent
            publicationReason={selectedReason}
            registration={register('story')}
          />
          <ErrorMessage message={errors.story?.message} />
        </S.FieldGroup>
        {selectedReason === PublicationReason.Adoption && (
          <Controller
            name="needsTransport"
            control={control}
            render={({ field }) => (
              <ConditionalSwitch
                label="¿Necesitás transporte?"
                variant="transport"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
        )}
        {selectedReason === PublicationReason.Lost && (
          <Controller
            name="offersReward"
            control={control}
            render={({ field }) => (
              <ConditionalSwitch
                label="¿Ofrecés recompensa?"
                variant="reward"
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked)
                  if (!checked) resetField('rewardAmount', { defaultValue: '' })
                }}
                rewardInputProps={{
                  ...rewardInputProps,
                  onChange: handleRewardAmountChange,
                }}
                rewardInputRef={rewardInputRef}
                rewardError={errors.rewardAmount?.message}
              />
            )}
          />
        )}
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Publicando...' : 'Publicar animal'}
          <Publish aria-hidden="true" />
        </S.SubmitButton>
      </S.MainContainer>
    </S.Page>
  )
}

export default CreateAnimalPost
