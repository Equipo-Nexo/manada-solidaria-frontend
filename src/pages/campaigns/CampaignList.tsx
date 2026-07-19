import type { CampaignCardData } from "../../components/campaignCard/CampaignCard";
import CampaignCard from "../../components/campaignCard/CampaignCard";
import * as S from "./CampaignList.styles";

type CampaignListProps = {
  campaigns: CampaignCardData[];
};

function CampaignList({ campaigns }: CampaignListProps) {
  return (
    <S.List>
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </S.List>
  );
}
export default CampaignList;
