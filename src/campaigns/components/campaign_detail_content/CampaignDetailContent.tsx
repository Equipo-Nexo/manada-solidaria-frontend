import MapDetailsComponent from "@/common/components/map_details_component/MapDetailsComponent";
import DonationItems from "@/campaigns/components/donation_items/DonationItems";
import { Calendar, Clock, Share } from "@/common/icons";
import OpenBook from "@/common/icons/OpenBook";
import { normalizeImageUrl, NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import { formatDateLong, formatDateTimeLong } from "@/common/utils/DateTime";
import * as S from "./CampaignDetailContent.styles";
import ContactCardComponent from "@/common/components/contact_details_component/ContactCardDetails";
import { campaignCategories, type CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { campaignCategoryLabels } from "@/campaigns/utils/CampaignUtils";
import { shareUrl } from "@/common/utils/HandleShare";
import { getAddress } from "@/common/utils/LocationUtils";
import type { CampaignDetailsResponse } from "@/common/app/types/Campaign.types";
import getOwnerRole from "@/common/utils/GetRoles";
import { ImagePreview } from "@/common/components";

interface DateInfoProps {
  label: string;
  dateTime?: string;
}

function DateInfoComponent({ label, dateTime }: DateInfoProps) {
  if (!dateTime) return null;

  const formatted = formatDateTimeLong(dateTime);

  return (
    <S.CampaignEndDate>
      <Calendar aria-hidden="true" />
      <S.EndDateContent>
        <S.EndDateLabel>{label}</S.EndDateLabel>
        <S.EndDateValue>
          {formatted.date}
          <br />
          {formatted.time}
        </S.EndDateValue>
      </S.EndDateContent>
    </S.CampaignEndDate>
  );
}

export default function CampaignDetailContent({
  campaignData,
}: {
  campaignData: CampaignDetailsResponse;
}) {
  const PHONE_NUMBER = campaignData?.phoneNumber
    ? `${campaignData?.phoneNumber.areaCode}${campaignData?.phoneNumber.number}`
    : "";
  const categoryCandidate = (campaignData?.category ?? campaignData?.type)?.toUpperCase();
  const campaignCategory =
    categoryCandidate !== "FUNDRAISING" &&
    campaignCategories.includes(categoryCandidate as CampaignCategory)
      ? (categoryCandidate as CampaignCategory)
      : undefined;
  const campaignImageUrl = campaignData?.imageId
    ? `${import.meta.env.VITE_CLOUDFLARE_URL}${campaignData.imageId}`
    : NOT_FOUND_IMAGE_URL;

  const handleShareButton = (campaignId: string) => {
    shareUrl({
      path: `?redirect=/campanias/${campaignId}`,
      text: "Mirá esta campaña, quizás te sirve.",
      imageUrl: normalizeImageUrl(campaignData?.imageUrl, true),
    });
  };

  return (
    <S.CampaignDetailContentContainer>
      <S.CampaignInformation>
        <S.PhotoContainer>
          <S.CampaignImage
            src={campaignImageUrl}
            alt={campaignData?.title ?? "Imagen de la colecta"}
          />
        </S.PhotoContainer>
        <S.DetailsColumn>
          <S.CampaignInfo>
            <S.CampaignHeading>
              <S.Title>{campaignData?.title}</S.Title>
              {campaignCategory && (
                <S.CampaignTypeBadge $campaignType={campaignCategory}>
                  {campaignCategory === "OTHER"
                    ? "General"
                    : campaignCategoryLabels[campaignCategory]}
                </S.CampaignTypeBadge>
              )}
            </S.CampaignHeading>
            <S.TimeContainer>
              <Clock aria-hidden="true" />
              <span>Publicado el {formatDateLong(campaignData.createdAt)}</span>
            </S.TimeContainer>
            {campaignData.newsStartDateTime && (
              <DateInfoComponent label="Inicio campaña" dateTime={campaignData.newsStartDateTime} />
            )}
            {(campaignData.newsEndDateTime || campaignData.campaignEndDate) && (
              <DateInfoComponent
                label="Fin campaña"
                dateTime={campaignData.newsEndDateTime || campaignData.campaignEndDate}
              />
            )}
          </S.CampaignInfo>
          <S.AuthorCard>
            <S.InfoContainer>
              <S.UserProfileContainer>
                <ImagePreview
                  imageId={campaignData.owner.profileImageURL ?? undefined}
                  alt={`Foto de perfil de ${campaignData.owner.username}`}
                  variant="round"
                />
              </S.UserProfileContainer>
              <S.ValuesContainer>
                <S.Label>
                  Publicado por <strong>{campaignData.owner.username}</strong>
                </S.Label>
                <S.AuthorRole>{getOwnerRole(campaignData.owner.roles)}</S.AuthorRole>
              </S.ValuesContainer>
            </S.InfoContainer>
          </S.AuthorCard>
          <DonationItems items={campaignData.items} />

          <S.DescriptionSection>
            <S.Title>
              <OpenBook aria-hidden="true" width="20" height="14" />
              Descripción
            </S.Title>
            <S.CampaignDescription>{campaignData?.description}</S.CampaignDescription>
          </S.DescriptionSection>
          <S.MapContainer>
            {campaignData?.location && (
              <MapDetailsComponent
                location={campaignData.location.city}
                address={getAddress(campaignData.location)}
                locationPath={`/mapa?latitude=${campaignData.location.latitude}&longitude=${campaignData.location.longitude}`}
              />
            )}
          </S.MapContainer>
        </S.DetailsColumn>
      </S.CampaignInformation>

      <S.ContactContent>
        <ContactCardComponent
          phoneNumber={PHONE_NUMBER}
          areaCode={campaignData!.phoneNumber!.areaCode}
          number={campaignData!.phoneNumber!.number}
          name={campaignData!.title}
        />
        <S.ShareButton type="submit" onClick={() => handleShareButton(campaignData.id)}>
          <Share aria-hidden="true" />
          Compartir Campaña
        </S.ShareButton>
      </S.ContactContent>
    </S.CampaignDetailContentContainer>
  );
}
