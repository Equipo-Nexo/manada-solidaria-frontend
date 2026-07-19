import { useGetCampaignsQuery } from "../../app/services/apis/campaignApi";
import type { CampaignCardData } from "../../components/campaignCard/CampaignCard";
import CampaignList from "./CampaignList";
import { useNavigate } from "react-router-dom";
import * as S from "./Campaigns.styles";
import { useState } from "react";
import Arrow from "../../components/icons/Arrow";

function Campaigns() {
  const { data } = useGetCampaignsQuery();
  const navigate = useNavigate();
  const campaigns = data?.content ?? [];
  const totalResults = data?.totalElements ?? 0;
  const campaignCards: CampaignCardData[] = campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    location: campaign.location.name,
    imageUrl: "https://placehold.co/600x400",
    type: "donacion",
  }));
  const filters = ["Todos", "Castración", "Donación", "Vacunación"];

  const [selectedFilter, setSelectedFilter] = useState("Todos");
  return (
    <div>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <Arrow />
        </S.BackButton>

        <S.HeaderContent>
          <S.Title>Campañas</S.Title>
          <S.Subtitle>
            {totalResults} {totalResults === 1 ? "resultado" : "resultados"}
          </S.Subtitle>
        </S.HeaderContent>
      </S.Header>
      <S.Filters>
        {filters.map((filter) => (
          <S.FilterButton
            key={filter}
            $active={filter === selectedFilter}
            onClick={() => setSelectedFilter(filter)} // llamar al endpoint cuando el back esté listo
          >
            {filter}
          </S.FilterButton>
        ))}
      </S.Filters>
      <CampaignList campaigns={campaignCards} />
    </div>
  );
}

export default Campaigns;
