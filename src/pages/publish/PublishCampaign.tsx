import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { publishCampaignSchema } from "./PublishCampaignSchema";
import * as S from "./PublishForm.styles";
import AdviceComponent from "../../components/advice/AdviceComponent";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Phone from "../../components/icons/Phone";
import Search from "../../components/icons/Search";
import Arrow from "../../components/icons/Arrow";
import { useCreateCampaignMutation } from "../../app/services/apis/campaignApi";
import { useToast } from "../../hooks/toast/useToast";
import { StyledMaskedInput } from "../../components/maskedInput/maskedInput.styles";
import DatePicker from "../../components/datePicker/DatePicker";
import PublishButton from "../../components/icons/PublishButton";
import FormErrorMessage from "../../components/errors/ErrorMessage";
import type {
  CampaignType,
  CreateCampaignRequest,
} from "../../app/services/requests/createCampaignRequest";
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
  donationNeeds?: DonationNeedCategory[];
};

const campaignCategories: PublishCampaignCategory[] = [
  "Donación",
  "Castración",
  "Vacunación",
  "Desparasitación",
  "Otro",
];

export type DonationNeedCategory =
  | "FOOD"
  | "MEDICINE"
  | "SHELTER_AND_BEDDING"
  | "TOYS_AND_ACCESSORIES"
  | "CLOTHING_AND_BLANKETS"
  | "OTHER";

export interface DonationNeedRequest {
  category: DonationNeedCategory;
}
const donationNeeds = [
  "Ropa",
  "Balanceado",
  "Accesorios",
  "Medicamentos",
  "Camas",
  "Otro",
] as const;

const donationNeedCategoryMap: Record<
  (typeof donationNeeds)[number],
  DonationNeedCategory
> = {
  Ropa: "CLOTHING_AND_BLANKETS",
  Balanceado: "FOOD",
  Accesorios: "TOYS_AND_ACCESSORIES",
  Medicamentos: "MEDICINE",
  Camas: "SHELTER_AND_BEDDING",
  Otro: "OTHER",
};
const campaignMap: Record<
  PublishCampaignCategory,
  {
    type: CampaignType;
    category: CampaignCategory | null;
  }
> = {
  Donación: {
    type: "DONATION",
    category: null,
  },
  Castración: {
    type: "NEWS",
    category: "CASTRATION",
  },
  Vacunación: {
    type: "NEWS",
    category: "VACCINATION",
  },
  Desparasitación: {
    type: "NEWS",
    category: "DEWORMING",
  },
  Otro: {
    type: "NEWS",
    category: "OTHER",
  },
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
    const selectedCampaign = campaignMap[data.category];
    const phoneNumber = `${data.phoneAreaCode}${data.phone}`;
    const request: CreateCampaignRequest = {
      type: selectedCampaign.type,
      category: selectedCampaign.category,
      title: data.title,
      description: data.description,
      imageId: "abc123",
      phoneNumber,
      location: {
        name: data.location,
        address: "",
        number: 12,
        latitude: 0,
        longitude: 0,
      },
      items:
        selectedCampaign.type === "DONATION"
          ? (data.donationNeeds ?? []).map((category) => ({
            category,
          }))
          : undefined,
      accountAlias: null,
      amountToBeCollected: null,
      campaignEndDate:
        selectedCampaign.type === "DONATION" && data.endDate
          ? data.endDate
          : undefined,
      newsStartDateTime:
        selectedCampaign.type === "NEWS"
          ? buildDateTime(data.startDate, data.startTime)
          : undefined,

      newsEndDateTime:
        selectedCampaign.type === "NEWS"
          ? buildDateTime(data.endDate, data.endTime)
          : undefined,
    };
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
          <FormErrorMessage message={errors.title?.message} />
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
          <FormErrorMessage message={errors.category?.message} />
        </S.PublishField>

        {isDonation && (
          <S.DonationNeeds>
            <S.PublishLabel>¿Qué necesitás recolectar?</S.PublishLabel>

            <S.DonationGrid>
              {donationNeeds.map((need) => (
                <S.DonationOption key={need}>
                  <S.DonationCheckbox
                    type="checkbox"
                    value={donationNeedCategoryMap[need]}
                    {...register("donationNeeds")}
                  />
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
          <FormErrorMessage message={errors.description?.message} />
        </S.PublishField>

        <S.PublishField $hidden={isDonation}>
          <S.PublishLabel>
            Fecha Inicio <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <DatePicker control={control} name="startDate" />
          <FormErrorMessage message={errors.startDate?.message} />
        </S.PublishField>

        <S.PublishField>
          <S.PublishLabel>
            Fecha fin <S.RequiredMark $hidden={isDonation}>*</S.RequiredMark>
          </S.PublishLabel>
          <DatePicker control={control} name="endDate" />
          <FormErrorMessage message={errors.endDate?.message} />
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
            <FormErrorMessage message={errors.startTime?.message} />
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
            <FormErrorMessage message={errors.endTime?.message} />
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
          <FormErrorMessage message={errors.phone?.message} />
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
          <FormErrorMessage message={errors.location?.message} />
          <S.MapPreview aria-hidden="true" />
          <S.HelpText>
            Buscá una dirección o tocá el mapa para marcar el punto.
          </S.HelpText>
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>Foto de la campaña</S.PublishLabel>

          <ImageUpload />
        </S.PublishField>

        <AdviceComponent advice="Las campañas con metas claras y fotos nítidas suelen completarse un 40% más rápido. Asegurate de incluir toda la información relevante." />

        <S.PublishSubmitButton type="submit">
          Publicar Campaña
          <PublishButton aria-hidden="true" />
        </S.PublishSubmitButton>
      </S.PublishForm>
    </S.PublishFormPage>
  );
}

export default PublishCampaign;
