import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishCampaignSchema, type PublishCampaignForm } from "@campaigns/app/schemas/PublishCampaignSchema";
import * as S from "./PublishForm.styles";
import { Advice, ImageUpload, DatePicker, ErrorMessage, AutocompleteGeolocation } from "@components/index.ts";
import { Phone } from "@icons/index.ts";
import { useCreateCampaignMutation } from "@campaigns/app/api/campaignApi";
import { useToast } from "@hooks/toast/useToast";
import { StyledMaskedInput } from "@components/maskedInput/maskedInput.styles";
import { type CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { campaignCategoryLabels, donationItemLabels } from "@/campaigns/utils/CampaignUtils";
import { recordToOptions } from "@/common/utils/RecordToOptions";
import { buildCreateCampaignRequest } from "@/campaigns/utils/CreateCampaignBuilder";
import { mapGeolocationToLocation } from "@utils/mapGeolocationToLocation";
import FormContainer from "@/common/components/form_container/FormContainer";

function PublishCampaign() {
  const navigate = useNavigate();
  const toast = useToast();
  const [createCampaign, { isLoading }] = useCreateCampaignMutation();
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory | null>(null);

  const isDonation = selectedCategory === "DONATION";

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publishCampaignSchema),
    defaultValues: {
      donationNeeds: [],
    }
  });
  const onSubmit = async (data: PublishCampaignForm) => {
    const request = buildCreateCampaignRequest(data)

    try {
      await createCampaign(request).unwrap();
      toast.success(
        "Campaña publicada",
        "La campaña se publicó correctamente.",
      );
      navigate("/home");
    } catch {
      toast.error(
        "No pudimos publicar la campaña",
        "Intentá nuevamente en unos minutos.",
      );
    }
  };

  return (
    <FormContainer
      pageTitle='Publicar Campaña'
      buttonText='Publicar Campaña'
      isLoadingForm={isLoading}
      loadingButtonText='Publicando...'
      handleSubmit={handleSubmit(onSubmit)}
    >
        <S.PublishField>
          <S.PublishLabel>
            Título de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PublishInput
            type="text"
            {...register("title")}
            placeholder="Ej: castraciones gratuitas"
          />
          <ErrorMessage message={errors.title?.message} />
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>
            Categoría de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.CategoryOptions>
            {recordToOptions(campaignCategoryLabels).map(({value, label}) => (
              <S.CategoryOption
                key={value}
                type="button"
                $isSelected={selectedCategory === value}
                aria-pressed={selectedCategory === value}
                onClick={() => {
                  setSelectedCategory(value);
                  setValue("category", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {label}
              </S.CategoryOption>
            ))}
          </S.CategoryOptions>
          <ErrorMessage message={errors.category?.message} />
        </S.PublishField>

        {isDonation && (
          <S.DonationNeeds>
            <S.PublishLabel>¿Qué necesitás recolectar?</S.PublishLabel>

            <S.DonationGrid>
              {recordToOptions(donationItemLabels).map(({ value, label }) => (
                <S.DonationOption key={value}>
                  <S.DonationCheckbox
                    type="checkbox"
                    value={value}
                    {...register("donationNeeds")}
                  />
                  {label}
                </S.DonationOption>
              ))}
            </S.DonationGrid>
            <ErrorMessage message={errors.donationNeeds?.message} />
          </S.DonationNeeds>
        )}

        <S.PublishField>
          <S.PublishLabel>
            Descripción de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PublishTextarea
            {...register("description")}
            placeholder="Contanos por qué es importante esta campaña y a quiénes ayudará..."
          />
          <ErrorMessage message={errors.description?.message} />
        </S.PublishField>

        <S.PublishField $hidden={isDonation}>
          <S.PublishLabel>
            Fecha Inicio <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <DatePicker control={control} name="startDate" />
          <ErrorMessage message={errors.startDate?.message} />
        </S.PublishField>

        <S.PublishField>
          <S.PublishLabel>
            Fecha fin <S.RequiredMark $hidden={isDonation}>*</S.RequiredMark>
          </S.PublishLabel>
          <DatePicker control={control} name="endDate" />
          <ErrorMessage message={errors.endDate?.message} />
        </S.PublishField>

        <S.TwoColumnFields $hidden={isDonation}>
          <S.PublishField>
            <S.PublishLabel>
              Hora inicio<S.RequiredMark> *</S.RequiredMark>
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="hora"
                    placeholder="09:00 hs"
                  />
                )}
              />
            </S.PublishLabel>
            <ErrorMessage message={errors.startTime?.message} />
          </S.PublishField>
          <S.PublishField>
            <S.PublishLabel>
              Hora Fin<S.RequiredMark> *</S.RequiredMark>
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="hora"
                    placeholder="15:00 hs"
                  />
                )}
              />
            </S.PublishLabel>
            <ErrorMessage message={errors.endTime?.message} />
          </S.PublishField>
        </S.TwoColumnFields>

        <S.PublishField>
          <S.PublishLabel>
            Número de teléfono <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PhoneFields>
            <S.InputWithIcon>
              <Controller
                control={control}
                name="phoneAreaCode"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    maskType="areaCode"
                    placeholder="353"
                    $hasLeftIcon
                    onAccept={(value) => field.onChange(value)}
                  />
                )}
              />
              <S.FieldIcon aria-hidden="true">
                <Phone />
              </S.FieldIcon>
            </S.InputWithIcon>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <StyledMaskedInput
                  {...field}
                  maskType="phoneNumber"
                  placeholder="56523551"
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
          </S.PhoneFields>
          <ErrorMessage message={errors.phone?.message} />
          <S.HelpText>
            El número es requerido para coordinar consultas o turnos.
          </S.HelpText>
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>
            Ubicación <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <Controller
            control={control}
            name="location"
            render={({ field, fieldState }) => (
              <>
                <AutocompleteGeolocation
                  placeHolder="¿Dónde se realizará la campaña?"
                  onChange={(value) =>
                    field.onChange(value ? mapGeolocationToLocation(value) : undefined)
                  }
                />
                <ErrorMessage message={fieldState.error?.message} />
              </>
            )}
          />
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>Foto de la campaña</S.PublishLabel>
          <Controller
            control={control}
            name="imageId"
            render={({ field }) => (
              <ImageUpload
                onImageSelected={(imageId) => field.onChange(imageId)}
              />
            )}
          />
        </S.PublishField>

        <Advice advice="Las campañas con metas claras y fotos nítidas suelen completarse un 40% más rápido. Asegurate de incluir toda la información relevante." />
    </FormContainer>
  );
}

export default PublishCampaign;
