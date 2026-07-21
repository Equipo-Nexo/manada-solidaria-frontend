import CampaignCard, {
  type CampaignCardData,
} from "../../../components/campaignCard/CampaignCard";
import { ChevronRight } from "../../../components/icons";
import * as S from "./CampaignCarousel.styles";

type CampaignCarouselProps = {
  title: string;
  campaigns: CampaignCardData[];
  onSeeAll?: () => void;
};

function CampaignCarousel({
  title,
  campaigns,
  onSeeAll,
}: CampaignCarouselProps) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>{title}</S.Title>

        <S.SeeAllButton type="button" onClick={onSeeAll}>
          Ver todos
          <ChevronRight aria-hidden="true" />
        </S.SeeAllButton>
      </S.Header>

      <S.Carousel>
        {campaigns.map((campaign) => (
          <S.Item key={campaign.id}>
            <CampaignCard campaign={campaign} />
          </S.Item>
        ))}
      </S.Carousel>
    </S.Container>
  );
}

export default CampaignCarousel;
