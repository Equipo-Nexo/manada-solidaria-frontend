import { useGetCampaignQuery } from "@/campaigns/app/api/campaignApi";
import { Loader, ScrollHint } from "@/common/components";
import MapDetailsComponent from "@/common/components/map_details_component/MapDetailsComponent";
import DonationItems from "@/campaigns/components/donation_items/DonationItems";
import { Arrow, Calendar, Share } from "@/common/icons";
import OpenBook from "@/common/icons/OpenBook";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import { formatDateTimeLong } from "@/common/utils/DateTime";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./CampaignDetail.styles"
import ContactCardComponent from "@/common/components/contact_details_component/ContactCardDetails";
import { campaignCategories, type CampaignCategory } from "@/campaigns/app/types/Campaign.types";
import { campaignCategoryLabels } from "@/campaigns/utils/CampaignUtils";
import { useState } from "react";
import useCopyToClipboard from "@/common/hooks/clipboard/useCopyToClipboard";
import { shareUrl } from "@/common/utils/HandleShare";

interface DateInfoProps {
    label: string;
    dateTime?: string;
}

function DateInfoComponent({ label, dateTime }: DateInfoProps) {
    if (!dateTime) return null

    const formatted = formatDateTimeLong(dateTime)

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
    )
}

function CampaingDetail() {

    const navigate = useNavigate();
    const [cropImage, setCropImage] = useState(false)

    const { campaignId } = useParams<{ campaignId: string }>();
    const { copy } = useCopyToClipboard()

    const { data: campaignData, isLoading, isError } = useGetCampaignQuery(
        campaignId!,
    );

    const location = campaignData?.location.name || 'Ubicación no informada'
    const address = campaignData?.location.address || ''
    const PHONE_NUMBER = campaignData?.phoneNumber
        ? `${campaignData?.phoneNumber.areaCode}${campaignData?.phoneNumber.number}`
        : ""
    const categoryCandidate = (campaignData?.category ?? campaignData?.type)?.toUpperCase()
    const campaignCategory = categoryCandidate !== "FUNDRAISING" &&
        campaignCategories.includes(categoryCandidate as CampaignCategory)
        ? categoryCandidate as CampaignCategory
        : undefined
    const campaignImageUrl = campaignData?.imageId
        ? `${import.meta.env.VITE_CLOUDFLARE_URL}${campaignData.imageId}`
        : NOT_FOUND_IMAGE_URL

    const handleShareButton = () => {
        shareUrl({
            path: `?redirect=/campanias/${campaignId}`,
            text: 'Mirá esta campaña, quizás te sirve.'
        })            
    }        

    return (
        <S.Page>
            <S.Header>
                <S.BackButton onClick={() => navigate("/home")}>
                    <Arrow aria-hidden="true" />
                </S.BackButton>
                <S.FormTitle>Información Colecta</S.FormTitle>
            </S.Header>
            {isLoading && <Loader label="Cargando información de la colecta." />}
            {isError ||
                (!campaignData && (
                    <div>Hubo un error al obtener informacion de la colecta.</div>
                ))}
            {!isLoading && !isError && campaignData && (
                <S.Content>
                    <S.HeroLayout>
                        <S.PhotoContainer $cropped={cropImage}>
                            <S.CampaignImage
                                src={campaignImageUrl}
                                alt={campaignData?.title ?? "Imagen de la colecta"}
                                $cropped={cropImage}
                                onLoad={({ currentTarget }) => {
                                    const ratio = currentTarget.naturalWidth / currentTarget.naturalHeight
                                    setCropImage(ratio < 0.65 || ratio > 2)
                                }}
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
                                {campaignData.newsStartDateTime &&
                                    <DateInfoComponent
                                        label="Inicio campaña"
                                        dateTime={campaignData.newsStartDateTime}
                                    />}
                                {(campaignData.newsEndDateTime || campaignData.campaignEndDate) &&
                                    <DateInfoComponent
                                        label="Fin campaña"
                                        dateTime={campaignData.newsEndDateTime || campaignData.campaignEndDate}
                                    />
                                }
                            </S.CampaignInfo>

                            <DonationItems items={campaignData.items} />

                            <S.DescriptionSection>
                                <S.Title>
                                    <OpenBook aria-hidden="true" width="20" height="14" />
                                    Descripción
                                </S.Title>
                                <S.CampaignDescription>
                                    {campaignData?.description}
                                </S.CampaignDescription>
                            </S.DescriptionSection>
                            {campaignData?.location && (
                                <MapDetailsComponent
                                    location={location}
                                    address={address}
                                    locationPath={`/mapa?latitude=${campaignData.location.latitude}&longitude=${campaignData.location.longitude}`}
                                />)}
                        </S.DetailsColumn>
                    </S.HeroLayout>
                    <S.BottomInfoRow>
                        <ContactCardComponent phoneNumber={PHONE_NUMBER} areaCode={campaignData!.phoneNumber!.areaCode} number={campaignData!.phoneNumber!.number} name={campaignData!.title} />
                        <S.ShareButton type="submit" onClick={handleShareButton}>
                            <Share aria-hidden="true" />
                            Compartir Campaña
                        </S.ShareButton>
                    </S.BottomInfoRow>
                </S.Content>
            )}
            {!isLoading && !isError && campaignData && <ScrollHint />}
        </S.Page>
    )
}
export default CampaingDetail;
