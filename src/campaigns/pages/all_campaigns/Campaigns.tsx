import { useGetCampaignsQuery } from "@campaigns/app/api/campaignApi";
import CampaignList from "@campaigns/components/campaign_list/CampaignList";
import { useNavigate } from "react-router-dom";
import * as S from "./Campaigns.styles";
import { useState } from "react";
import { CategorySelector } from "@components/index.ts";
import { ArrowLeft } from "@icons/index.ts";
import { campaignFilters, type CampaignFilter } from "@/campaigns/app/api/requests/CreateCampaignRequest";
import { CAMPAIGN_FILTER_LABELS, mapCampaignToCardData } from "@/campaigns/utils/CampaignUtils";

function Campaigns() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<CampaignFilter>('');
  const { data, isError, isLoading, refetch } = useGetCampaignsQuery({ category: selectedFilter });
  
  const campaigns = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate('/home')} aria-label="Volver">
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
        categories={campaignFilters}
        selectedCategory={selectedFilter}
        onCategoryChange={setSelectedFilter}
        getCategoryLabel={(filter) => CAMPAIGN_FILTER_LABELS[filter]}
        ariaLabel="Filtrar campañas por categoría"
      />
      <CampaignList
        campaigns={campaigns.map(mapCampaignToCardData)}
        isError={isError}
        isLoading={isLoading}
        onRetry={() => void refetch()}
      />
    </S.Page>
  );
}

export default Campaigns;
