import { useGetCampaignsQuery } from "../../app/services/apis/campaignApi";
import type { CampaignCardData } from "../../components/campaignCard/CampaignCard";
import CampaignCarousel from "./campaignCarousel/CampaignCarousel";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data } = useGetCampaignsQuery();
  const navigate = useNavigate();

  const campaigns = data?.content ?? [];

  const campaignCards: CampaignCardData[] = campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    location: campaign.location.name,
    imageUrl: "https://placehold.co/600x400",
    type: "donacion",
  }));

  return (
    <CampaignCarousel
      title="Enterate de las novedades"
      campaigns={campaignCards}
      onSeeAll={() => navigate("/campanias")}
    />
  );
}

export default Home;
