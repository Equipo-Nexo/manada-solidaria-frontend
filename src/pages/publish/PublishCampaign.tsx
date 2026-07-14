import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info } from "../../components/icons";
import * as S from "./PublishForm.styles";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import ImageSourceSheet from "../../components/imageUpload/ImageSourceSheet";
import Phone from "../../components/icons/Phone";
import Calendar from "../../components/icons/Calendar";
import Search from "../../components/icons/Search";
import Arrow from "../../components/icons/Arrow";

const campaignCategories = [
  "Donación",
  "Castración",
  "Vacunación",
  "Desparasitación",
  "Otro",
];
const donationNeeds = [
  "Alimento",
  "Medicamentos",
  "Insumos veterinarios",
  "Otros",
];
type CampaignCategory = (typeof campaignCategories)[number];

function PublishCampaign() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<CampaignCategory>("Castración");
  const showDonationNeeds = selectedCategory === "Donación";

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

      <S.PublishForm onSubmit={(event) => event.preventDefault()}>
        <S.PublishField>
          <S.PublishLabel>
            Título de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PublishInput
            type="text"
            name="title"
            placeholder="Ej: castraciones gratuitas"
          />
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
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </S.CategoryOption>
            ))}
          </S.CategoryOptions>
        </S.PublishField>

        {showDonationNeeds && (
          <S.DonationNeeds>
            <S.DonationLegend>¿Qué necesitás recolectar?</S.DonationLegend>
            {donationNeeds.map((need) => (
              <S.DonationOption key={need}>
                <input type="checkbox" value={need} />
                {need}
              </S.DonationOption>
            ))}
          </S.DonationNeeds>
        )}

        <S.PublishField>
          <S.PublishLabel>
            Descripción de la campaña <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PublishTextarea
            name="description"
            placeholder="Contanos por qué es importante esta campaña y a quiénes ayudará..."
          />
        </S.PublishField>

        <S.PublishField>
          <S.PublishLabel>
            Fecha Inicio <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.InputWithIcon>
            <S.IconInput
              type="text"
              name="startDate"
              placeholder="dd/mm/yyyy"
              $hasRightIcon
            />
            <S.FieldIcon aria-hidden="true" $position="right">
              <Calendar />
            </S.FieldIcon>
          </S.InputWithIcon>
        </S.PublishField>

        <S.PublishField>
          <S.PublishLabel>
            Fecha fin <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.InputWithIcon>
            <S.IconInput
              type="text"
              name="endDate"
              placeholder="dd/mm/yyyy"
              $hasRightIcon
            />
            <S.FieldIcon aria-hidden="true" $position="right">
              <Calendar />
            </S.FieldIcon>
          </S.InputWithIcon>
        </S.PublishField>

        <S.TwoColumnFields>
          <S.PublishField>
            Hora inicio
            <S.IconInput type="text" name="startTime" placeholder="09:00 hs" />
          </S.PublishField>
          <S.PublishField>
            Hora Fin
            <S.IconInput type="text" name="endTime" placeholder="15:00 hs" />
          </S.PublishField>
        </S.TwoColumnFields>

        <S.PublishField>
          <S.PublishLabel>
            Número de teléfono <S.RequiredMark>*</S.RequiredMark>
          </S.PublishLabel>
          <S.PhoneFields>
            <S.InputWithIcon>
              <S.IconInput
                type="text"
                name="phoneAreaCode"
                placeholder="353"
                $hasLeftIcon
              />
              <S.FieldIcon aria-hidden="true">
                <Phone />
              </S.FieldIcon>
            </S.InputWithIcon>
            <S.PublishInput type="tel" name="phone" placeholder="56523551" />
          </S.PhoneFields>
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
              name="location"
              placeholder="¿Dónde se realizará la campaña?"
              $hasLeftIcon
            />
            <S.FieldIcon aria-hidden="true">
              <Search />
            </S.FieldIcon>
          </S.InputWithIcon>
          <S.MapPreview aria-hidden="true">
            <S.MapPin />
            <S.LocateButton type="button" aria-label="Usar mi ubicación" />
          </S.MapPreview>
          <S.HelpText>
            Buscá una dirección o tocá el mapa para marcar el punto.
          </S.HelpText>
        </S.PublishField>

        <S.PublishField as="div">
          <S.PublishLabel>Foto de la campaña</S.PublishLabel>

          <ImageUpload>
            {({ close }) => (
              <ImageSourceSheet
                onCamera={() => {
                  close();
                }}
                onGallery={() => {
                  close();
                }}
              />
            )}
          </ImageUpload>
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
        </S.PublishSubmitButton>
      </S.PublishForm>
    </S.PublishFormPage>
  );
}

export default PublishCampaign;
