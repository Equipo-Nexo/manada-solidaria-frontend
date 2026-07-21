import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishCampaignSchema } from "./PublishCampaignSchema";
import { Info } from "../../components/icons";
import * as S from "./PublishForm.styles";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Phone from "../../components/icons/Phone";
import Search from "../../components/icons/Search";
import Arrow from "../../components/icons/Arrow";
import { useCreateCampaignMutation } from "../../app/services/apis/campaignApi";
import { useToast } from "../../hooks/toast/useToast";
import { StyledMaskedInput } from "../../components/maskedInput/maskedInput.styles";
import DatePicker from "../../components/datePicker/DatePicker";
import PublishButton from "../../components/icons/PublishButton";
import type { CreateCampaignRequest } from "../../app/services/requests/createCampaignRequest";
import type { CampaignCategory } from "../../app/services/requests/createCampaignRequest";
function buildDateTime(date?: string, time?: string) {
  if (!date || !time) return null;
  return `${date}T${time}:00`;
}

export type PublishCampaignCategory =
  | "Donación"
  | "Castración"
  | "Vacunación"
  | "Desparasitación"
  | "Otro";

type PublishCampaignForm = {
  title: string;
  category: PublishCampaignCategory;
  description: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  phoneAreaCode: string;
  phone: string;
  location: string;
};

const campaignCategories: PublishCampaignCategory[] = [
  "Donación",
  "Castración",
  "Vacunación",
  "Desparasitación",
  "Otro",
];

const donationNeeds = [
  "Ropa",
  "Alimento",
  "Accesorios",
  "Medicamentos",
  "Camas",
  "Otro",
];

const categoryMap: Record<PublishCampaignCategory, CampaignCategory> = {
  Donación: "DONATION",
  Castración: "CASTRATION",
  Vacunación: "VACCINATION",
  Desparasitación: "DEWORMING",
  Otro: "OTHER",
};

function PublishCampaign() {
  const navigate = useNavigate();
  const [createCampaign] = useCreateCampaignMutation();
  const toast = useToast();
  const [selectedCategory, setSelectedCategory] =
    useState<PublishCampaignCategory | null>(null);

  const isDonation = selectedCategory === "Donación";

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publishCampaignSchema),
  });
  const onSubmit = async (data: PublishCampaignForm) => {
    const request: CreateCampaignRequest = {
      type: "NEWS",
      category: categoryMap[data.category],

      title: data.title,
      description: data.description,
      imageId: "",

      location: {
        name: data.location,
        address: "",
        number: null,
        latitude: 0,
        longitude: 0,
      },

      accountAlias: null,
      amountToBeCollected: null,
      campaignEndDate: null,

      newsStartDateTime: buildDateTime(data.startDate, data.startTime),
      newsEndDateTime: buildDateTime(data.endDate, data.endTime),
    };

    try {
      await createCampaign(request).unwrap();

      toast.success(
        "Campaña publicada",
        "La campaña se publicó correctamente.",
      );
    } catch {
      toast.error(
        "No pudimos publicar la campaña",
        "Intentá nuevamente en unos minutos.",
      );
    }
  };
  return (
    <S.PublishFormPage>
      <S.PublishFormHeader>
        <S.PublishBackButton
          type="button"
          aria-label="Volver"
          onClick={() => navigate(-1)}
        >
          <Arrow aria-hidden="true" />
        </S.PublishBackButton>
        <S.PublishFormTitle>Publicar Campaña</S.PublishFormTitle>
      </S.PublishFormHeader>

      <S.PublishForm onSubmit={handleSubmit(onSubmit)}>
        <S.PublishField>
          <S.PublishLabel>
            Título de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PublishInput
            type="text"
            {...register("title")}
            placeholder="Ej: castraciones gratuitas"
          />
          {errors.title && (
            <S.ErrorMessage>{errors.title.message}</S.ErrorMessage>
          )}
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>
            Categoría de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.CategoryOptions>
            {campaignCategories.map((category) => (
              <S.CategoryOption
                key={category}
                type="button"
                $isSelected={selectedCategory === category}
                aria-pressed={selectedCategory === category}
                onClick={() => {
                  setSelectedCategory(category);
                  setValue("category", category, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                {category}
              </S.CategoryOption>
            ))}
          </S.CategoryOptions>
          {errors.category && (
            <S.ErrorMessage>{errors.category.message}</S.ErrorMessage>
          )}
        </S.PublishField>

        {isDonation && (
          <S.DonationNeeds>
            <S.PublishLabel>¿Qué necesitás recolectar?</S.PublishLabel>
            <S.DonationGrid>
              {donationNeeds.map((need) => (
                <S.DonationOption key={need}>
                  <S.DonationCheckbox type="checkbox" value={need} />
                  {need}
                </S.DonationOption>
              ))}
            </S.DonationGrid>
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
          {errors.description && (
            <S.ErrorMessage>{errors.description.message}</S.ErrorMessage>
          )}
        </S.PublishField>

        <S.PublishField $hidden={isDonation}>
          <S.PublishLabel>
            Fecha Inicio <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <DatePicker control={control} name="startDate" />
          {errors.startDate && (
            <S.ErrorMessage>{errors.startDate.message}</S.ErrorMessage>
          )}
        </S.PublishField>

        <S.PublishField>
          <S.PublishLabel>
            Fecha fin <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <DatePicker control={control} name="endDate" />
          {errors.endDate && (
            <S.ErrorMessage>{errors.endDate.message}</S.ErrorMessage>
          )}
        </S.PublishField>

        <S.TwoColumnFields $hidden={isDonation}>
          <S.PublishField>
            <S.PublishLabel>
              Hora inicio
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    type="hora"
                    placeholder="09:00 hs"
                  />
                )}
              />
            </S.PublishLabel>
            {errors.startTime && (
              <S.ErrorMessage>{errors.startTime.message}</S.ErrorMessage>
            )}
          </S.PublishField>
          <S.PublishField>
            <S.PublishLabel>
              Hora Fin
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    type="hora"
                    placeholder="15:00 hs"
                  />
                )}
              />
            </S.PublishLabel>
            {errors.endTime && (
              <S.ErrorMessage>{errors.endTime.message}</S.ErrorMessage>
            )}
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
                    type="areaCode"
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
                  type="phoneNumber"
                  placeholder="56523551"
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
          </S.PhoneFields>
          {errors.phone && (
            <S.ErrorMessage>{errors.phone.message}</S.ErrorMessage>
          )}
          <S.HelpText>
            El número es requerido para coordinar consultas o turnos.
          </S.HelpText>
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>
            Ubicación <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.InputWithIcon>
            <S.IconInput
              type="text"
              {...register("location")}
              placeholder="¿Dónde se realizará la campaña?"
              $hasLeftIcon
            />
            <S.FieldIcon aria-hidden="true">
              <Search />
            </S.FieldIcon>
          </S.InputWithIcon>
          {errors.location && (
            <S.ErrorMessage>{errors.location.message}</S.ErrorMessage>
          )}
          <S.MapPreview aria-hidden="true" />
          <S.HelpText>
            Buscá una dirección o tocá el mapa para marcar el punto.
          </S.HelpText>
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>Foto de la campaña</S.PublishLabel>

          <ImageUpload />
        </S.PublishField>

        <S.AdvisoryCard>
          <S.AdvisoryIcon>
            <Info aria-hidden="true" />
          </S.AdvisoryIcon>
          <S.AdvisoryContent>
            <S.AdvisoryTitle>Consejo</S.AdvisoryTitle>
            <S.AdvisoryText>
              Las campañas con metas claras y fotos nítidas suelen completarse
              un 40% más rápido. Asegurate de incluir toda la información
              relevante.
            </S.AdvisoryText>
          </S.AdvisoryContent>
        </S.AdvisoryCard>

        <S.PublishSubmitButton type="submit">
          Publicar Campaña
          <PublishButton aria-hidden="true" />
        </S.PublishSubmitButton>
      </S.PublishForm>
    </S.PublishFormPage>
  );
}

export default PublishCampaign;
