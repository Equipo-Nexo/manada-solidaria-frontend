import { type MouseEvent } from 'react'
import * as S from "./CampaignCard.styles";
import { LocationPin, Share } from "../../../common/icons";
import type { Location } from "@services/responses/Location";
import { campaignCategoryLabels } from "@/campaigns/utils/CampaignUtils";
import type { CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { openWhatsApp } from "@/common/utils/Whatsapp";
import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";
import { ImagePreview } from "@/common/components";
import useCopyToClipboard from "@/common/hooks/clipboard/useCopyToClipboard";
import { shareUrl } from '@/common/utils/HandleShare';

export type CampaignCardData = {
  id?: string | number;
  type: CampaignCategory;
  title: string;
  description: string;
  location?: Location;
  imageUrl: string;
  imageAlt?: string;
  phoneNumber: PhoneNumber
};

type CampaignCardProps = {
  campaign: CampaignCardData;
  className?: string;
  onMoreInfo?: (campaign: CampaignCardData) => void;
  onShare?: (campaign: CampaignCardData) => void;
};

function CampaignCard({
  campaign,
  className,
  onMoreInfo
}: CampaignCardProps) {

  const { copy } = useCopyToClipboard()

  const handleShareButton = () => {
    shareUrl({
      path: `?redirect=/campanias/${campaign.id}`,
      text: 'Mirá esta campaña, quizás te sirve.'
    })    
  }
  
  const openCampaignDetail = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest('button, a')) return
    onMoreInfo?.(campaign)
  };

  return (
    <S.Card
      className={className}
      $clickable={Boolean(onMoreInfo)}
      role={onMoreInfo ? "link" : undefined}
      tabIndex={onMoreInfo ? 0 : undefined}
      onClick={openCampaignDetail}
    >
      <S.ImageSection>
        <ImagePreview 
          imageId={campaign.imageUrl}
          alt={campaign.title}
        />
        <S.ShareButton
          type="button"
          aria-label={`Compartir campaña ${campaign.title}`}
          onClick={handleShareButton}
        >
          <Share aria-hidden="true" />
        </S.ShareButton>
      </S.ImageSection>

      <S.Body>
        <S.MetaRow>
          <S.Location>
            <LocationPin aria-hidden="true" />
            <span>{campaign.location?.name}</span>
          </S.Location>
          <S.TypeBadge $campaignType={campaign.type}>
            {campaign.type == 'OTHER' ? 'General' : campaignCategoryLabels[campaign.type]}
          </S.TypeBadge>
        </S.MetaRow>

        <S.Content>
          <S.Title>{campaign.title}</S.Title>
          <S.Description>{campaign.description}</S.Description>
          <S.MoreInfoButton
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openCampaignDetail(event);
            }}
          >
            Ver más información
          </S.MoreInfoButton>
        </S.Content>

        <S.ConsultButton type="button" onClick={(event) => {
          event.stopPropagation();
          openWhatsApp(
            `${campaign.phoneNumber.areaCode}${campaign.phoneNumber.number}`,
            `¡Hola! Me gustaría consultar por la campaña ${campaign.title}`
          );
        }}>
          Consultar
        </S.ConsultButton>
      </S.Body>
    </S.Card>
  );
}

export default CampaignCard;
