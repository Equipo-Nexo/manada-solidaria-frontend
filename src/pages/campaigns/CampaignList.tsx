import type { CampaignCardData } from "../../components/campaignCard/CampaignCard";
import CampaignCard from "../../components/campaignCard/CampaignCard";
import * as S from "./CampaignList.styles";

type CampaignListProps = {
  campaigns: CampaignCardData[];
};

function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return <S.EmptyState>No hay campañas para esta categoría.</S.EmptyState>;
  }

  return (
    <S.List>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </S.List>
  );
}
export default CampaignList;
