import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CarFront, Info, Search, Send } from '../../components/icons'
import AnimalSelectorComponent from './AnimalSelectorComponent'
import ColorSelectorComponent from './ColorSelectorComponent'
import { newAnimalPostSchema, type NewAnimalPostFormValues } from './newAnimalPostSchema'
import * as S from './newAnimalPostForm.styles'
import OptionsComponent from './OptionsComponent'
import OptionsErrorMessage from './OptionsErrorMessage'
import PhoneInputComponent from './PhoneInputComponent'
import SexAgeSelectorComponent from './SexAgeSelectorComponent'

export type PublicationReason = 'ADOPTION' | 'LOST' | 'STREET' | 'FOSTER'

export type AnimalSize = 'SMALL' | 'MEDIUM' | 'LARGE'

const publicationReasons: Array<{
  value: PublicationReason
  title: string
  description: string
}> = [
    { value: 'ADOPTION', title: 'En adopción', description: 'Busca familia o tránsito (hogar provisorio)' },
    { value: 'LOST', title: 'Perdido', description: 'Es mi mascota y la estoy buscando' },
    { value: 'STREET', title: 'En la calle', description: 'Lo vi suelto y sin dueño aparente' },
    { value: 'FOSTER', title: 'En tránsito', description: 'Está bajo cuidado temporal y busca un hogar' },
  ]

const animalSize: Array<{
  value: AnimalSize
  title: string
  description: string
}> = [
    { value: 'SMALL', title: 'Pequeño', description: 'Menos de 10 kg' },
    { value: 'MEDIUM', title: 'Mediano', description: 'Entre 10 y 25 kg' },
    { value: 'LARGE', title: 'Grande', description: 'Más de 25 kg' },
  ]

function AdviceComponent({ advice }: { advice: string }) {
  return (
    <S.AdviceContainer>
      <S.AdviceIcon><Info aria-hidden="true" /></S.AdviceIcon>
      <S.AdviceContent>
        <S.AdviceTitle>Consejo</S.AdviceTitle>
        <S.Advice>{advice}</S.Advice>
      </S.AdviceContent>
    </S.AdviceContainer>
  )
}


function SwitchComponent({ label }: { label: string }) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <S.SwitchGroup>
      <S.SwitchRow>
        <S.SwitchLabelContent><CarFront aria-hidden="true" />{label}</S.SwitchLabelContent>
        <S.SwitchInput
          type="checkbox"
          checked={isSelected}
          aria-describedby={isSelected ? 'transport-help' : undefined}
          onChange={(event) => setIsSelected(event.target.checked)}
        />
        <S.SwitchControl aria-hidden="true" />
      </S.SwitchRow>
      {isSelected && (
        <S.SwitchHelpText id="transport-help" aria-live="polite">
          Si seleccionas esta opción, se enviará una notificación a los transportistas de
          la app para que se comuniquen con vos.
        </S.SwitchHelpText>
      )}
    </S.SwitchGroup>
  )
}

function NewAnimalPostForm() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<NewAnimalPostFormValues>({
    resolver: yupResolver(newAnimalPostSchema),
    defaultValues: {
      photo: undefined,
      publicationReason: undefined,
      animalType: undefined,
      animalSex: undefined,
      animalAge: undefined,
      animalSize: undefined,
      color: null,
      name: '',
      areaCode: '',
      phoneNumber: '',
      story: '',
    },
    mode: 'onTouched',
  })
  const selectedReason = useWatch({ control, name: 'publicationReason' })

  const selectedAnimalSize = useWatch({ control, name: 'animalSize' })
  const selectedAnimalType = useWatch({ control, name: 'animalType' })
  const selectedAnimalSex = useWatch({ control, name: 'animalSex' })
  const selectedAnimalAge = useWatch({ control, name: 'animalAge' })
  const selectedColor = useWatch({ control, name: 'color' })

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>
        <S.PageTitle>Publicar un animal</S.PageTitle>
      </S.Header>

      <S.MainContainer onSubmit={handleSubmit(() => undefined)} noValidate>
        <S.FieldGroup>


          <S.UploadImageButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-describedby={errors.photo ? 'photo-error' : undefined}
          >

          </S.UploadImageButton>

          {errors.photo && <S.ErrorMessage id="photo-error" role="alert">{errors.photo.message}</S.ErrorMessage>}
        </S.FieldGroup>

        <AdviceComponent
          advice={"Una buena foto hace la diferencia. Procurá que se vea el animal completo, con buena luz y sin filtros."}
        />

        <S.FieldGroup>
          <S.Label id="publication-reason-label">¿Por qué estás publicando este animal? <S.Required>*</S.Required></S.Label>
          <S.OptionsGroup
            role="radiogroup"
            aria-labelledby="publication-reason-label"
            aria-describedby={errors.publicationReason ? 'publication-reason-error' : undefined}
            aria-invalid={Boolean(errors.publicationReason)}
          >
            {publicationReasons.map((reason) => (
              <OptionsComponent
                key={reason.value}
                name="publicationReason"
                title={reason.title}
                description={reason.description}
                value={reason.value}
                selected={selectedReason === reason.value}
                onSelect={(value) => setValue('publicationReason', value, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })}
              />
            ))}
          </S.OptionsGroup>
          <OptionsErrorMessage
            id="publication-reason-error"
            message={errors.publicationReason?.message}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Ubicación</S.Label>
          <S.IconInputWrapper>
            <Search aria-hidden="true" />
            <S.Input placeholder="¿En dónde se encuentra el animal?" />
          </S.IconInputWrapper>
          <S.MapContainer>
            <S.MapPlaceholder>
              <S.MapPin aria-hidden="true" />
              <S.LocationButton type="button" aria-label="Usar mi ubicación">◎</S.LocationButton>
            </S.MapPlaceholder>
            <S.Suggestion>
              Buscá una dirección o tocá el mapa para marcar la zona aproximada. Evitá
              compartir tu dirección exacta.
            </S.Suggestion>
          </S.MapContainer>
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Tipo de animal <S.Required>*</S.Required></S.Label>
          <AnimalSelectorComponent
            amount={3}
            selected={selectedAnimalType}
            errorId="animal-type-error"
            hasError={Boolean(errors.animalType)}
            onSelect={(value) => setValue('animalType', value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })}
          />
          <OptionsErrorMessage id="animal-type-error" message={errors.animalType?.message} />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Nombre</S.Label>
          <S.Input
            placeholder="Si no lo sabés, podés dejarlo vacío"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name && <S.ErrorMessage role="alert">{errors.name.message}</S.ErrorMessage>}
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Sexo y edad <S.Required>*</S.Required></S.Label>
          <SexAgeSelectorComponent
            sex={selectedAnimalSex}
            age={selectedAnimalAge}
            sexError={errors.animalSex?.message}
            ageError={errors.animalAge?.message}
            onSexChange={(value) => setValue('animalSex', value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })}
            onAgeChange={(value) => setValue('animalAge', value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label id="animal-size-label">Tamaño del animal <S.Required>*</S.Required></S.Label>
          <S.OptionsGroup
            role="radiogroup"
            aria-labelledby="animal-size-label"
            aria-describedby={errors.animalSize ? 'animal-size-error' : undefined}
            aria-invalid={Boolean(errors.animalSize)}
          >
            {animalSize.map((size) => (
              <OptionsComponent
                key={size.value}
                name="animalSize"
                title={size.title}
                description={size.description}
                value={size.value}
                selected={selectedAnimalSize === size.value}
                onSelect={(value) => setValue('animalSize', value, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })}
              />
            ))}
          </S.OptionsGroup>
          <OptionsErrorMessage id="animal-size-error" message={errors.animalSize?.message} />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Color predominante</S.Label>
          <ColorSelectorComponent
            selected={selectedColor ?? undefined}
            onSelect={(value) => setValue('color', value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Número de teléfono <S.Required>*</S.Required></S.Label>
          <PhoneInputComponent
            areaCodeRegistration={register('areaCode')}
            phoneNumberRegistration={register('phoneNumber')}
            error={errors.areaCode?.message ?? errors.phoneNumber?.message}
          />
          <S.PhoneSuggestion>
            Es obligatorio para que adoptantes o colaboradores puedan contactarte
          </S.PhoneSuggestion>
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>Contanos su historia <S.Required>*</S.Required></S.Label>
          <S.TextArea
            placeholder="¿Cómo es su personalidad? ¿Cómo lo/la encontraste?...."
            aria-invalid={Boolean(errors.story)}
            {...register('story')}
          />
          {errors.story && <S.ErrorMessage role="alert">{errors.story.message}</S.ErrorMessage>}
        </S.FieldGroup>

        <SwitchComponent label="¿Necesitás transporte?" />
        <S.SubmitButton type="submit">Publicar animal <Send aria-hidden="true" /></S.SubmitButton>
      </S.MainContainer>
    </S.Page>
  )
}

export default NewAnimalPostForm
