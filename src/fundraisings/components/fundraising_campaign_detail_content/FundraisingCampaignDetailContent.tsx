import type { FundraisingCampaignResponse } from "@/common/app/types/Campaign.types";
import { Check, OpenMap, Share } from "@/common/icons";
import { useNavigate } from "react-router-dom";
import * as S from "./FundraisingCampaignDetailContent.styles";
import { normalizeImageUrl } from "@/common/utils/CommonUtils";
import Calendar from "@/common/icons/Calendar";
import Copy from "@/common/icons/Copy";
import useCopyToClipboard from "@/common/hooks/clipboard/useCopyToClipboard";
import Transfer from "@/common/icons/Transfer";
import OpenBook from "@/common/icons/OpenBook";
import { formatDateTimeLong } from "@/common/utils/DateTime";
import { shareUrl } from "@/common/utils/HandleShare";
import ContactCardComponent from "@/common/components/contact_details_component/ContactCardDetails";
import { getAddress } from "@/common/utils/LocationUtils";

export default function FundraisingCampaignDetailContent(
    data: FundraisingCampaignResponse
) {
    const navigate = useNavigate();
    const goal = data?.amountToBeCollected;
    const collected = data?.amountCollected ?? 0;
    const hasGoal = goal != null && goal > 0;
    const progress = hasGoal
        ? Math.min(100, Math.round((collected / goal) * 100))
        : 0;
    const { copied: copiedAlias, copy: copyAlias } = useCopyToClipboard();
    const handleCopyAlias = () => {
        if (data?.accountAlias) {
            copyAlias(data.accountAlias);
        }
    };

    const PHONE_NUMBER = data?.phoneNumber
        ? `${data?.phoneNumber.areaCode}${data?.phoneNumber.number}`
        : ""

    const handleShareButton = () => {
        shareUrl({
            path: `?redirect=${window.location.pathname}`,
            text: 'Mirá esta colecta para ayudar a un animalito.',
            imageUrl: normalizeImageUrl(data?.imageId, true)
        })
    }

    return (
        <S.ContentContainer>
            <S.InformationContent>
                <S.PhotoContainer>
                    <S.FundraisingImage
                        src={normalizeImageUrl(data?.imageId)}
                        alt={data?.title ?? "Imagen de la colecta"}
                    />
                </S.PhotoContainer>
                <S.FundraisingInformationContainer>
                    <S.FundraisingInfo>
                        <S.Title>{data?.title}</S.Title>
                        {data && data.campaignEndDate && (
                            <S.FundraisingEndDate>
                                <Calendar aria-hidden="true" />
                                <S.EndDateContent>
                                    <S.EndDateLabel>Fin colecta</S.EndDateLabel>
                                    <S.EndDateValue>
                                        {formatDateTimeLong(data.campaignEndDate).date}
                                    </S.EndDateValue>
                                </S.EndDateContent>
                            </S.FundraisingEndDate>
                        )}
                    </S.FundraisingInfo>
                    <S.AliasSection>
                        <S.IconContainer>
                            <Transfer aria-hidden="true" />
                        </S.IconContainer>
                        <S.AliasContent>
                            <S.AliasLabel>ALIAS PARA TRANSFERIR</S.AliasLabel>
                            <S.AliasValue>{data?.accountAlias}</S.AliasValue>
                        </S.AliasContent>
                        <S.CopyButton
                            type="button"
                            onClick={handleCopyAlias}
                            $copied={copiedAlias}
                        >
                            {copiedAlias ? (
                                <Check aria-hidden="true" />
                            ) : (
                                <Copy $inverted aria-hidden="true" />
                            )}

                            {copiedAlias ? "Alias copiado" : "Copiar alias"}
                        </S.CopyButton>
                    </S.AliasSection>
                    {hasGoal && (
                        <S.FundraisingGoal>
                            <S.Title>Meta de recaudación</S.Title>
                            <S.GoalHeader>
                                <S.GoalAmount>${goal.toLocaleString("es-AR")}</S.GoalAmount>
                                <S.GoalPercentage>{progress}%</S.GoalPercentage>
                            </S.GoalHeader>
                            <S.ProgressTrack>
                                <S.ProgressValue $progress={progress} />
                            </S.ProgressTrack>
                            <S.GoalFooter>
                                <S.CollectedAmount>
                                    ${collected.toLocaleString("es-AR")} recaudados
                                </S.CollectedAmount>
                                <S.RemainingAmount>
                                    Faltan $
                                    {Math.max(goal - collected, 0).toLocaleString("es-AR")}
                                </S.RemainingAmount>
                            </S.GoalFooter>
                        </S.FundraisingGoal>
                    )}
                    <S.DescriptionSection>
                        <S.Title>
                            <OpenBook aria-hidden="true" width="20" height="14" />
                            Descripción
                        </S.Title>
                        <S.FundraisingDescription>
                            {data?.description}
                        </S.FundraisingDescription>
                    </S.DescriptionSection>
                    {data?.location && (
                        <S.LocationCard>
                            <S.MapPreview aria-hidden="true"><S.MapMarker /></S.MapPreview>
                            <S.LocationContent>
                                <S.LocationTitle>{data.location.city}</S.LocationTitle>
                                <S.LocationAddress>{getAddress(data.location)}</S.LocationAddress>
                                <S.MapLink
                                    type="button"
                                    onClick={() => navigate(
                                        `/mapa?latitude=${data.location.latitude}&longitude=${data.location.longitude}`,
                                    )}
                                >
                                    Ver en el mapa <OpenMap aria-hidden="true" />
                                </S.MapLink>
                            </S.LocationContent>
                        </S.LocationCard>
                    )}
                </S.FundraisingInformationContainer>
            </S.InformationContent>
            <S.ContactContent>
                {PHONE_NUMBER && (
                    <ContactCardComponent phoneNumber={PHONE_NUMBER} areaCode={data!.phoneNumber!.areaCode} number={data!.phoneNumber!.number} name={data!.title} />
                )}
                <S.ShareButton onClick={handleShareButton}>
                    <Share aria-hidden="true" />
                    Compartir colecta
                </S.ShareButton>
            </S.ContactContent>
        </S.ContentContainer>
    )
}
