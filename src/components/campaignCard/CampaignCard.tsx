import * as S from "./CampaignCard.styles";
import { LocationPin, Share2 } from "../icons";

export type CampaignType =
  | "donation"
  | "castration"
  | "vaccination"
  | "deworming"
  | "other";

export type CampaignCardData = {
  id?: string | number;
  type: CampaignType;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  imageAlt?: string;
};

type CampaignCardProps = {
  campaign: CampaignCardData;
  className?: string;
  onConsult?: (campaign: CampaignCardData) => void;
  onMoreInfo?: (campaign: CampaignCardData) => void;
  onShare?: (campaign: CampaignCardData) => void;
};

const campaignTypeLabels: Record<CampaignType, string> = {
  donation: "Donación",
  castration: "Castración",
  vaccination: "Vacunación",
  deworming: "Desparasitación",
  other: "General",
};

function CampaignCard({
  campaign,
  className,
  onConsult,
  onMoreInfo,
  onShare,
}: CampaignCardProps) {
  const imageAlt = campaign.imageAlt ?? campaign.title;

  return (
    <S.Card className={className}>
      <S.ImageSection>
        <S.CampaignImage src={campaign.imageUrl} alt={imageAlt} />
        <S.ShareButton
          type="button"
          aria-label={`Compartir campaña ${campaign.title}`}
          onClick={() => onShare?.(campaign)}
        >
          <Share2 aria-hidden="true" />
        </S.ShareButton>
      </S.ImageSection>

      <S.Body>
        <S.MetaRow>
          <S.Location>
            <LocationPin aria-hidden="true" />
            <span>{campaign.location}</span>
          </S.Location>
          <S.TypeBadge $campaignType={campaign.type}>
            {campaignTypeLabels[campaign.type]}
          </S.TypeBadge>
        </S.MetaRow>

        <S.Content>
          <S.Title>{campaign.title}</S.Title>
          <S.Description>{campaign.description}</S.Description>
          <S.MoreInfoButton
            type="button"
            onClick={() => onMoreInfo?.(campaign)}
          >
            Ver más información
          </S.MoreInfoButton>
        </S.Content>

        <S.ConsultButton type="button" onClick={() => onConsult?.(campaign)}>
          Consultar
        </S.ConsultButton>
      </S.Body>
    </S.Card>
  );
}

export default CampaignCard;
