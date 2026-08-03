import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type {
  CampaignDetailsResponse,
  CampaignDetailsType,
} from '../../../app/types/Campaign.types'
import {
  useEditCampaignMutation,
  useGetCampaignQuery,
} from '../../../app/services/apis/campaignApi'
import type { CreateCampaignRequest } from '../../../app/services/requests/createCampaignRequest'
import AdviceComponent from '../../../components/advice/AdviceComponent'
import DatePicker from '../../../components/datePicker/DatePicker'
import FormErrorMessage from '../../../components/errors/ErrorMessage'
import ImageUpload from '../../../components/imageUpload/ImageUpload'
import Arrow from '../../../components/icons/Arrow'
import Phone from '../../../components/icons/Phone'
import PublishButton from '../../../components/icons/PublishButton'
import Search from '../../../components/icons/Search'
import { StyledMaskedInput } from '../../../components/maskedInput/maskedInput.styles'
import { useToast } from '../../../hooks/toast/useToast'
import { editCampaignSchema, type EditCampaignFormValues } from './EditCampaign.schema'
import * as S from './EditCampaign.styles'

const splitDateTime = (dateTime?: string | null) => ({
  date: dateTime?.slice(0, 10) ?? '',
  time: dateTime?.slice(11, 16) ?? '',
})

const buildDateTime = (date?: string, time?: string) =>
  date && time ? `${date}T${time}:00` : null

const getImagePreviewUrl = (imageId?: string) => {
  if (!imageId) return undefined
  if (/^https?:\/\//i.test(imageId)) return imageId
  return `${import.meta.env.VITE_CLOUDFLARE_URL}${imageId}`
}

const campaignRequestType: Record<
  Exclude<CampaignDetailsType, 'fundraising'>,
  Pick<CreateCampaignRequest, 'type' | 'category'>
> = {
  donation: { type: 'DONATION', category: null },
  castration: { type: 'NEWS', category: 'CASTRATION' },
  vaccination: { type: 'NEWS', category: 'VACCINATION' },
  deworming: { type: 'NEWS', category: 'DEWORMING' },
  other: { type: 'NEWS', category: 'OTHER' },
}

const getDefaultValues = (
  campaign: CampaignDetailsResponse,
): EditCampaignFormValues => {
  const phoneNumber = campaign.phoneNumber ?? ''
  const currentImageId = campaign.imageId ?? campaign.imageUrl ?? ''
  const start = splitDateTime(campaign.newsStartDateTime)
  const end = campaign.type !== 'donation'
    ? splitDateTime(campaign.newsEndDateTime)
    : { date: campaign.campaignEndDate?.slice(0, 10) ?? '', time: '' }

  return {
    campaignType: campaign.type,
    title: campaign.title,
    description: campaign.description,
    startDate: start.date,
    endDate: end.date,
    startTime: start.time,
    endTime: end.time,
    phoneAreaCode: phoneNumber.slice(0, -7),
    phone: phoneNumber.slice(-7),
    location: campaign.location?.name ?? '',
    imageId: currentImageId,
  }
}

function EditCampaign() {
  const navigate = useNavigate()
  const { campaignId } = useParams<{ campaignId: string }>()
  const toast = useToast()
  const { data: campaign, isError, isLoading: isLoadingCampaign } = useGetCampaignQuery(
    campaignId ?? '',
    { skip: !campaignId },
  )
  const [editCampaign, { isLoading: isSaving }] = useEditCampaignMutation()
  const defaultValues = useMemo(
    () => campaign ? getDefaultValues(campaign) : undefined,
    [campaign],
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EditCampaignFormValues>({
    resolver: yupResolver(editCampaignSchema),
    mode: 'onTouched',
    values: defaultValues,
  })

  if (campaign?.type === 'fundraising') {
    return <Navigate to="/mis-publicaciones" replace />
  }

  const handleEditCampaign = async (values: EditCampaignFormValues) => {
    if (!campaign || !campaignId || campaign.type === 'fundraising') return

    const requestType = campaignRequestType[campaign.type]

    const body: CreateCampaignRequest = {
      type: requestType.type,
      category: requestType.category,
      title: values.title.trim(),
      description: values.description.trim(),
      imageId: values.imageId || campaign.imageId || campaign.imageUrl,
      location: {
        name: values.location.trim(),
        address: campaign.location?.address ?? '',
        number: campaign.location?.number ?? null,
        latitude: campaign.location?.latitude ?? 0,
        longitude: campaign.location?.longitude ?? 0,
      },
      items: campaign.items,
      phoneNumber: `${values.phoneAreaCode}${values.phone}`,
      accountAlias: campaign.accountAlias,
      amountToBeCollected: campaign.amountToBeCollected,
      campaignEndDate: campaign.type === 'donation'
        ? values.endDate
        : campaign.campaignEndDate,
      newsStartDateTime: campaign.type !== 'donation'
        ? buildDateTime(values.startDate, values.startTime)
        : campaign.newsStartDateTime,
      newsEndDateTime: campaign.type !== 'donation'
        ? buildDateTime(values.endDate, values.endTime)
        : campaign.newsEndDateTime,
    }

    try {
      await editCampaign({ campaignId, body }).unwrap()
      navigate(`/editar/campania/${campaignId}/exito`, {
        replace: true,
        state: {
          imageUrl: getImagePreviewUrl(values.imageId),
          name: values.title.trim(),
        },
      })
    } catch {
      toast.error(
        'No pudimos actualizar la campaña',
        'Revisá los datos e intentá nuevamente.',
      )
    }
  }

  if (isLoadingCampaign) return <S.Loading>Cargando campaña...</S.Loading>
  if (isError || !campaign) {
    return <S.Loading role="alert">No pudimos cargar la campaña.</S.Loading>
  }

  const showsNewsSchedule = campaign.type !== 'donation'

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
          <Arrow aria-hidden="true" />
        </S.BackButton>
        <S.Title>Editar campaña</S.Title>
      </S.Header>

      <S.Form
        onSubmit={handleSubmit(handleEditCampaign)}
        aria-busy={isSaving}
        noValidate
      >
        <S.Field>
          <S.Label htmlFor="edit-campaign-title">
            Título de la campaña <S.Required>*</S.Required>
          </S.Label>
          <S.Input id="edit-campaign-title" {...register('title')} />
          <FormErrorMessage message={errors.title?.message} />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="edit-campaign-description">
            Descripción de la campaña <S.Required>*</S.Required>
          </S.Label>
          <S.TextArea id="edit-campaign-description" {...register('description')} />
          <FormErrorMessage message={errors.description?.message} />
        </S.Field>

        {showsNewsSchedule && (
          <S.Field>
            <S.Label>Fecha inicio <S.Required>*</S.Required></S.Label>
            <DatePicker control={control} name="startDate" />
            <FormErrorMessage message={errors.startDate?.message} />
          </S.Field>
        )}

        <S.Field>
          <S.Label>
            Fecha fin {showsNewsSchedule && <S.Required>*</S.Required>}
          </S.Label>
          <DatePicker control={control} name="endDate" />
          <FormErrorMessage message={errors.endDate?.message} />
        </S.Field>

        {showsNewsSchedule && (
          <S.TwoColumns>
            <S.Field>
              <S.Label>Hora inicio <S.Required>*</S.Required></S.Label>
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="hora"
                    placeholder={field.value ? '' : '09:00 hs'}
                  />
                )}
              />
              <FormErrorMessage message={errors.startTime?.message} />
            </S.Field>
            <S.Field>
              <S.Label>Hora fin <S.Required>*</S.Required></S.Label>
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="hora"
                    placeholder={field.value ? '' : '15:00 hs'}
                  />
                )}
              />
              <FormErrorMessage message={errors.endTime?.message} />
            </S.Field>
          </S.TwoColumns>
        )}

        <S.Field>
          <S.Label>Número de teléfono <S.Required>*</S.Required></S.Label>
          <S.PhoneFields>
            <S.InputWithIcon>
              <Controller
                control={control}
                name="phoneAreaCode"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="areaCode"
                    placeholder={field.value ? '' : '353'}
                    $hasLeftIcon
                    onAccept={(value) => field.onChange(String(value))}
                  />
                )}
              />
              <S.FieldIcon aria-hidden="true"><Phone /></S.FieldIcon>
            </S.InputWithIcon>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <StyledMaskedInput
                  {...field}
                  maskType="phoneNumber"
                  placeholder={field.value ? '' : '5652355'}
                  onAccept={(value) => field.onChange(String(value))}
                />
              )}
            />
          </S.PhoneFields>
          <FormErrorMessage message={errors.phoneAreaCode?.message ?? errors.phone?.message} />
          <S.HelpText>El número es requerido para coordinar consultas o turnos.</S.HelpText>
        </S.Field>

        <S.Field>
          <S.Label htmlFor="edit-campaign-location">
            Ubicación <S.Required>*</S.Required>
          </S.Label>
          <S.InputWithIcon>
            <S.Input id="edit-campaign-location" {...register('location')} />
            <S.FieldIcon aria-hidden="true"><Search /></S.FieldIcon>
          </S.InputWithIcon>
          <FormErrorMessage message={errors.location?.message} />
          <S.MapPreview aria-hidden="true" />
          <S.HelpText>Buscá una dirección o tocá el mapa para marcar el punto.</S.HelpText>
        </S.Field>

        <S.Field>
          <S.Label>Foto de la campaña</S.Label>
          <Controller
            control={control}
            name="imageId"
            render={({ field, fieldState }) => (
              <>
                <ImageUpload
                  imageUrl={getImagePreviewUrl(field.value)}
                  label="Seleccionar foto"
                  ariaDescribedBy={fieldState.error ? 'campaign-image-error' : undefined}
                  hasError={Boolean(fieldState.error)}
                  onImageSelected={field.onChange}
                />
                <FormErrorMessage
                  id="campaign-image-error"
                  message={fieldState.error?.message}
                />
              </>
            )}
          />
        </S.Field>

        <AdviceComponent advice="Las campañas con metas claras y fotos nítidas suelen completarse más rápido. Asegurate de incluir toda la información relevante." />

        <S.SubmitButton type="submit" disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
          <PublishButton aria-hidden="true" />
        </S.SubmitButton>
      </S.Form>
    </S.Page>
  )
}

export default EditCampaign
