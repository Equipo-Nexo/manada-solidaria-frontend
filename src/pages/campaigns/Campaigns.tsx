import { useGetCampaignsQuery } from "../../app/services/apis/campaignApi";
import type { CampaignCardData } from "../../components/campaignCard/CampaignCard";
import CampaignList from "./CampaignList";
import { useNavigate } from "react-router-dom";
import * as S from "./Campaigns.styles";
import { useState } from "react";
import CategorySelector from "../../components/categorySelector/CategorySelector";
import { ArrowLeft } from "../../components/icons";

function Campaigns() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] =
    useState<keyof typeof filterMap>("Todos");
  const filterMap = {
    Todos: undefined,
    Donación: "DONATION",
    Castración: "CASTRATION",
    Vacunación: "VACCINATION",
  } as const;
  const { data, isError, isLoading, refetch } = useGetCampaignsQuery({
    category: filterMap[selectedFilter],
  });
  const campaigns = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;

  const campaignCards: CampaignCardData[] = campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    location: campaign.location.name,
    imageUrl: campaign.imageId,
    type: campaign.type,
  }));
  const filters = Object.keys(filterMap) as (keyof typeof filterMap)[];

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>
        <S.TitlesContainer>
          <S.PageTitle>Campañas</S.PageTitle>
          <S.PageSubtitle>
            {isLoading
              ? 'Cargando resultados...'
              : `${totalElements} ${totalElements === 1 ? 'resultado' : 'resultados'}`}
          </S.PageSubtitle>
        </S.TitlesContainer>
      </S.Header>
      <CategorySelector
        categories={filters}
        selectedCategory={selectedFilter}
        onCategoryChange={setSelectedFilter}
        ariaLabel="Filtrar campañas por categoría"
      />
      <CampaignList
        campaigns={campaignCards}
        isError={isError}
        isLoading={isLoading}
        onRetry={() => void refetch()}
      />
    </S.Page>
  );
}

export default Campaigns;
