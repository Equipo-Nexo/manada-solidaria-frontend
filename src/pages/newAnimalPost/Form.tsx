import { yupResolver } from '@hookform/resolvers/yup'
import {
  Controller,
  useController,
  useForm,
  useWatch,
  type UseFormRegisterReturn,
} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ColorPalet, Publish, Search } from '../../components/icons'
import AdviceComponent from '../../components/advice/AdviceComponent'
import { newAnimalPostSchema, type NewAnimalPostFormValues } from './Form.schema'
import * as S from './Form.styles'
import OptionsComponent from '../../components/inputs/OptionsComponent'
import PhoneInputComponent from '../../components/inputs/PhoneInputComponent'
import FormErrorMessage from '../../components/errors/ErrorMessage'
import SelectorComponent, { type SelectorOption } from '../../components/inputs/SelectorComponent'
import perroImage from '../../components/images/Perro.png'
import gatoImage from '../../components/images/Gato.png'
import otroImage from '../../components/images/Otro.png'
import ConditionalSwitchComponent from './components/ConditionalSwitchComponent'
import {
  AnimalAge,
  AnimalColor,
  AnimalPostType,
  AnimalSex,
  AnimalSize,
  AnimalType,
} from '../../app/types/AnimalPost.types'
import { PublicationReason } from './utils/PublicationReason'
import { newAnimalPostDefaultValues } from './utils/DefaultValues'
import { useCreateAnimalPostMutation } from '../../app/services/apis/animalPostsApi'
import type { CreateAnimalPostRequest } from '../../app/services/requests/animalPostRequests'
import { useToast } from '../../hooks/toast/useToast'
import ImageUpload from '../../components/imageUpload/ImageUpload'
import Arrow from '../../components/icons/Arrow'

const TEMPORARY_LOCATION: CreateAnimalPostRequest['location'] = {
  name: 'Parque Centenario',
  address: 'Av. Patricias',
  number: 100,
  latitude: -34.6,
  longitude: -58.4,
}

const animalSexOptions: ReadonlyArray<SelectorOption<AnimalSex>> = [
  { value: AnimalSex.Male, label: 'Macho' },
  { value: AnimalSex.Female, label: 'Hembra' },
  { value: AnimalSex.Unknown, label: 'Desconocido' },
]

const animalAgeOptions: ReadonlyArray<SelectorOption<AnimalAge>> = [
  { value: AnimalAge.Puppy, label: 'Cachorro' },
  { value: AnimalAge.Adult, label: 'Adulto' },
  { value: AnimalAge.Senior, label: 'Anciano' },
  { value: AnimalAge.Unknown, label: 'Desconocido' },
]

const publicationReasons: Array<{
  value: PublicationReason
  title: string
  description: string
  textArea: string
}> = [
    { value: PublicationReason.Adoption, title: 'En adopción', description: 'Busca familia o tránsito (hogar provisorio)', textArea: '¿Cómo es su personalidad? ¿Cómo lo/la encontraste?...' },
    { value: PublicationReason.Lost, title: 'Perdido', description: 'Es mi mascota y la estoy buscando', textArea: '¿Cómo es? Proporcioná una descripción detallada para que sea fácilmente reconocible..' },
    { value: PublicationReason.Street, title: 'En la calle', description: 'Lo vi suelto y sin dueño aparente', textArea: '¿Dónde lo viste? ¿Es un animal comunitario? ¿Se encuentra herido? ....' },
    { value: PublicationReason.Transit, title: 'En tránsito', description: 'Está bajo cuidado temporal y busca un hogar', textArea: '¿Durante cuánto tiempo tiene tránsito? ¿Cómo es su personalidad? ¿Dónde lo/la encontraste? ....' },
  ]

const animalSize: Array<{
  value: AnimalSize
  title: string
  description: string
}> = [
    { value: AnimalSize.Small, title: 'Pequeño', description: 'Menos de 10 kg' },
    { value: AnimalSize.Medium, title: 'Mediano', description: 'Entre 10 y 25 kg' },
    { value: AnimalSize.Large, title: 'Grande', description: 'Más de 25 kg' },
  ]

interface AnimalSelectorOption {
  value: AnimalType
  label: string
  imageSrc: string
}

const animalKinds: ReadonlyArray<AnimalSelectorOption> = [
  { value: AnimalType.Dog, label: 'Perro', imageSrc: perroImage },
  { value: AnimalType.Cat, label: 'Gato', imageSrc: gatoImage },
  { value: AnimalType.Other, label: 'Otro', imageSrc: otroImage },
]

interface AnimalSelectorProps {
  options: ReadonlyArray<AnimalSelectorOption>
  selected?: AnimalType
  errorId?: string
  hasError?: boolean
  onSelect: (type: AnimalType) => void
}

function AnimalSelectorComponent({
  options,
  selected,
  errorId,
  hasError = false,
  onSelect,
}: AnimalSelectorProps) {
  return (
    <S.AnimalItemContainer
      role="radiogroup"
      aria-label="Tipo de animal"
      aria-describedby={hasError ? errorId : undefined}
      aria-invalid={hasError}
    >
      {options.map((animal) => (
        <S.AnimalItem
          key={animal.value}
          type="button"
          role="radio"
          aria-checked={selected === animal.value}
          $selected={selected === animal.value}
          onClick={() => onSelect(animal.value)}
        >
          <S.AnimalImage src={animal.imageSrc} alt="" />
          <S.AnimalTitle>{animal.label}</S.AnimalTitle>
        </S.AnimalItem>
      ))}
    </S.AnimalItemContainer>
  )
}

const colors: Array<{ value: AnimalColor; label: string; hex: string }> = [
  { value: AnimalColor.Gray, label: 'Gris', hex: '#8C8C8C' },
  { value: AnimalColor.Black, label: 'Negro', hex: '#1A1A1A' },
  { value: AnimalColor.Blonde, label: 'Rubio', hex: '#E9C98D' },
  { value: AnimalColor.Brown, label: 'Marrón', hex: '#A0522D' },
  { value: AnimalColor.White, label: 'Blanco', hex: '#FFFFFF' },
  { value: AnimalColor.Other, label: 'Otro', hex: '#FFFFFF' },
]

interface ColorSelectorProps {
  selected?: AnimalColor
  onSelect: (color: AnimalColor) => void
}

function ColorSelectorComponent({ selected, onSelect }: ColorSelectorProps) {
  return (
    <S.ColorsContainer role="radiogroup" aria-label="Color predominante">
      {colors.map(({ value, label, hex }) => (
        <S.ColorItem key={value}>
          <S.Color
            $color={hex}
            $selected={selected === value}
            role="radio"
            aria-checked={selected === value}
            aria-label={label}
            onClick={() => onSelect(value)}
          >
            {value === AnimalColor.Other && <ColorPalet aria-hidden="true" />}
          </S.Color>
          <S.ColorName $selected={selected === value}>{label}</S.ColorName>
        </S.ColorItem>
      ))}
    </S.ColorsContainer>
  )
}



interface DescriptionComponentProps {
  publicationReason?: PublicationReason
  registration: UseFormRegisterReturn<'story'>
}

function DescriptionComponent({
  publicationReason,
  registration,
}: DescriptionComponentProps) {
  const placeholder = publicationReasons.find(
    ({ value }) => value === publicationReason,
  )?.textArea ?? 'Contanos la historia del animal'

  return (
    <S.TextArea
      placeholder={placeholder}
      {...registration}
    />
  )
}

function NewAnimalPostForm() {

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
  const { ref: rewardInputRef, ...rewardInputProps } = register('rewardAmount')
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

  const handleCreateAnimalPost = async (values: NewAnimalPostFormValues) => {
    const reward = values.offersReward
      ? Number(values.rewardAmount.replace(',', '.'))
      : undefined

    const commonRequest = {
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
      location: TEMPORARY_LOCATION,
      phoneNumber: `${values.areaCode}${values.phoneNumber}`,
      ...(reward !== undefined ? { reward } : {}),
    }

    const request: CreateAnimalPostRequest =
      values.publicationReason === PublicationReason.Lost ||
        values.publicationReason === PublicationReason.Street
        ? {
          ...commonRequest,
          type: AnimalPostType.Lost,
          hasOwner: values.publicationReason === PublicationReason.Lost,
        }
        : {
          ...commonRequest,
          type: AnimalPostType.Adoption,
          inTransit: values.publicationReason === PublicationReason.Transit,
        }

    try {
      await createAnimalPost(request).unwrap()
      toast.success('Publicación creada', 'El animal fue publicado correctamente.')
      navigate('/home', { replace: true })
    } catch {
      toast.error('No pudimos publicar el animal', 'Revisá los datos e intentá nuevamente.')
    }
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
                  ariaDescribedBy={fieldState.error ? 'photo-error' : undefined}
                  hasError={Boolean(fieldState.error)}
                  onImageSelected={(imageId) => field.onChange(imageId)}
                />
                <FormErrorMessage id="photo-error" message={fieldState.error?.message} />
              </>
            )}
          />
        </S.FieldGroup>
        <AdviceComponent
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
                <FormErrorMessage
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
            <S.MapPlaceholder></S.MapPlaceholder>
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
                <FormErrorMessage id="animal-type-error" message={fieldState.error?.message} />
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
          <FormErrorMessage message={errors.name?.message} />
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
                  options={animalSexOptions}
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
                  options={animalAgeOptions}
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
                <FormErrorMessage id="animal-size-error" message={fieldState.error?.message} />
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
          <FormErrorMessage message={errors.story?.message} />
        </S.FieldGroup>
        {selectedReason === PublicationReason.Adoption && (
          <Controller
            name="needsTransport"
            control={control}
            render={({ field }) => (
              <ConditionalSwitchComponent
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
              <ConditionalSwitchComponent
                label="¿Ofrecés recompensa?"
                variant="reward"
                checked={field.value}
                onChange={(checked) => {
                  field.onChange(checked)
                  if (!checked) resetField('rewardAmount', { defaultValue: '' })
                }}
                rewardInputProps={rewardInputProps}
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

export default NewAnimalPostForm
