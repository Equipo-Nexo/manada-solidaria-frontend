import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import type { CampaignDetailsResponse } from '@models/Campaign.types'
import { useEditCampaignMutation, useGetCampaignQuery } from '@campaigns/app/api/campaignApi'
import { Advice, DatePicker, ErrorMessage, ImageUpload, AutocompleteGeolocation } from '@components/index.ts'
import { Phone } from '@icons/index.ts'
import { StyledMaskedInput } from '@components/maskedInput/maskedInput.styles'
import { useToast } from '@hooks/toast/useToast'
import { editCampaignSchema, type EditCampaignFormValues } from '../../app/schemas/EditCampaign.schema'
import * as S from './EditCampaign.styles'
import type { EditCampaignRequest } from '@/campaigns/app/api/requests/EditCampaignRequest'
import { buildEditCampaignRequest } from '@/campaigns/utils/EditCampaignBuilder'
import { splitDateTime } from '@/common/utils/DateTime'
import { mapGeolocationToLocation } from '@utils/mapGeolocationToLocation'
import FormContainer from '@/common/components/form_container/FormContainer'
import { scrollToFirstFormError } from '@utils/scrollToFirstFormError'


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
    category: campaign.type.toUpperCase(),
    title: campaign.title,
    description: campaign.description,
    startDate: start.date,
    endDate: end.date,
    startTime: start.time,
    endTime: end.time,
    phoneAreaCode: phoneNumber.areaCode,
    phone: phoneNumber.number,
    location: campaign.location,
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
    register
  } = useForm<EditCampaignFormValues>({
    resolver: yupResolver(editCampaignSchema),
    mode: 'onTouched',
    values: defaultValues,
  })

  const handleEditCampaign = async (values: EditCampaignFormValues) => {
    if (!campaign || !campaignId || campaign.type === 'fundraising') return
    
    const body: EditCampaignRequest = buildEditCampaignRequest(values)
    editCampaign({ campaignId, body })
      .unwrap()
      .then(() => {
        navigate(`/editar/exito`, {
            state: {
                imageUrl: values.imageId,
                name: values.title.trim(),
                onDetailRedirect: '/campanias'
            },
        })
      })
      .catch(() => {

        toast.error(
          'No pudimos actualizar la campaña',
          'Revisá los datos e intentá nuevamente.',
        )
      })
  }

  if (isLoadingCampaign) return <S.Loading>Cargando campaña...</S.Loading>
  if (isError || !campaign) {
    return <S.Loading role="alert">No pudimos cargar la campaña.</S.Loading>
  }

  const showsNewsSchedule = campaign.type !== 'donation'

  return (
    <FormContainer
      pageTitle='Editar campaña'
      buttonText='Guardar cambios'
      isLoadingForm={isSaving}
      loadingButtonText='Guardando...'
      handleSubmit={handleSubmit(handleEditCampaign, scrollToFirstFormError)}    
    >
              <S.Field>
          <S.Label htmlFor="edit-campaign-title">
            Título de la campaña <S.Required>*</S.Required>
          </S.Label>
          <S.Input id="edit-campaign-title" {...register('title')} />
          <ErrorMessage message={errors.title?.message} />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="edit-campaign-description">
            Descripción de la campaña <S.Required>*</S.Required>
          </S.Label>
          <S.TextArea id="edit-campaign-description" {...register('description')} />
          <ErrorMessage message={errors.description?.message} />
        </S.Field>

        {showsNewsSchedule && (
          <S.Field>
            <S.Label>Fecha inicio <S.Required>*</S.Required></S.Label>
            <DatePicker control={control} name="startDate" />
            <ErrorMessage message={errors.startDate?.message} />
          </S.Field>
        )}

        <S.Field>
          <S.Label>
            Fecha fin {showsNewsSchedule && <S.Required>*</S.Required>}
          </S.Label>
          <DatePicker control={control} name="endDate" />
          <ErrorMessage message={errors.endDate?.message} />
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
              <ErrorMessage message={errors.startTime?.message} />
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
              <ErrorMessage message={errors.endTime?.message} />
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
          <ErrorMessage message={errors.phoneAreaCode?.message ?? errors.phone?.message} />
          <S.HelpText>El número es requerido para coordinar consultas o turnos.</S.HelpText>
        </S.Field>

        <S.Field>
          <S.Label htmlFor="edit-campaign-location">
            Ubicación <S.Required>*</S.Required>
          </S.Label>
          <Controller
            control={control}
            name="location"
            render={({ field, fieldState }) => (
              <>
                <AutocompleteGeolocation
                  initialLocation={field.value}
                  placeHolder="¿Dónde se realizará la campaña?"
                  onChange={(value) =>
                    field.onChange(value ? mapGeolocationToLocation(value) : undefined)
                  }
                />
                <ErrorMessage message={fieldState.error?.message} />
              </>
            )}
          />
        </S.Field>

        <S.Field>
          <S.Label>Foto de la campaña</S.Label>
          <Controller
            control={control}
            name="imageId"
            render={({ field, fieldState }) => (
              <>
                <ImageUpload
                  imageUrl={field.value}
                  onImageSelected={field.onChange}
                />
                <ErrorMessage
                  id="campaign-image-error"
                  message={fieldState.error?.message}
                />
              </>
            )}
          />
        </S.Field>
        <Advice advice="Las campañas con metas claras y fotos nítidas suelen completarse más rápido. Asegurate de incluir toda la información relevante." />
    </FormContainer>
  )
}

export default EditCampaign
