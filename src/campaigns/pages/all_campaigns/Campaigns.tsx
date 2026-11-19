import { useGetCampaignsQuery } from "@campaigns/app/api/campaignApi";
import CampaignList from "@campaigns/components/campaign_list/CampaignList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CategorySelector } from "@components/index.ts";
import { campaignFilters, type CampaignFilter } from "@/campaigns/app/api/requests/CreateCampaignRequest";
import { CAMPAIGN_FILTER_LABELS, mapCampaignToCardData } from "@/campaigns/utils/CampaignUtils";
import Layout from "@/common/components/layout/Layout";

function Campaigns() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<CampaignFilter>('');
  const { data, isError, isLoading, refetch } = useGetCampaignsQuery({ category: selectedFilter });
  
  const campaigns = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;

  return (
    <Layout
      isError={isError}
      isLoading={isLoading}
      title="Campañas"
      subtitle={isLoading ? 'Cargando resultados...' : `${totalElements} ${totalElements === 1 ? 'resultado' : 'resultados'}`}
    >
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
        onMoreInfo={(campaign) => navigate(`/campanias/${campaign.id}`)}
      />
    </Layout>
  );
}

export default Campaigns;
