import { Arrow, Check, Phone, Share } from "@/common/icons";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./FundraisingCampaignDetail.styles";
import { useGetFundraisingByIdQuery } from "@/campaigns/app/api/campaignApi";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import Calendar from "@/common/icons/Calendar";
import Copy from "@/common/icons/Copy";
import useCopyToClipboard from "@/common/hooks/clipboard/useCopyToClipboard";
import Transfer from "@/common/icons/Transfer";
import OpenBook from "@/common/icons/OpenBook";
import Map from "@/common/icons/Map";
import { Loader } from "@/common/components";
import { openWhatsApp } from "@/common/utils/Whatsapp";
function FundraisingCampaignDetail() {
  const navigate = useNavigate();
  const { fundraisingId } = useParams();
  const { data, isLoading, isError } = useGetFundraisingByIdQuery(
    fundraisingId!,
  );
  const goal = data?.amountToBeCollected;
  const collected = data?.amountCollected ?? 0;
  const hasGoal = goal != null && goal > 0;
  const progress = hasGoal
    ? Math.min(100, Math.round((collected / goal) * 100))
    : 0;
  const { copied, copy } = useCopyToClipboard();
  const handleCopyAlias = () => {
    if (data?.accountAlias) {
      void copy(data.accountAlias);
    }
  };
  const handleViewMap = () => {
    if (!data?.location) {
      return;
    }
    navigate("/mapa", {
      state: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      },
    });
  };
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
        (!data && (
          <div>Hubo un error al obtener informacion de la colecta.</div>
        ))}
      {!isLoading && !isError && data && (
        <S.Content>
          <S.FundraisingImage
            src={
              data?.imageId
                ? `${import.meta.env.VITE_CLOUDFLARE_URL}${data.imageId}`
                : NOT_FOUND_IMAGE_URL
            }
            alt={data?.title ?? "Imagen de la colecta"}
          />
          <S.FundraisingInfo>
            <S.Title>{data?.title}</S.Title>
            <S.FundraisingEndDate>
              <Calendar aria-hidden="true" />
              <S.EndDateContent>
                <S.EndDateLabel>Fin colecta</S.EndDateLabel>
                <S.EndDateValue>Viernes 3 de julio 2026</S.EndDateValue>
              </S.EndDateContent>
            </S.FundraisingEndDate>
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
              $copied={copied}
            >
              {copied ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy $inverted aria-hidden="true" />
              )}

              {copied ? "Alias copiado" : "Copiar alias"}
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
            <S.LocationSection>
              <S.LocationMapPreview></S.LocationMapPreview>
              <S.LocationContent>
                <S.LocationName>{data.location.name}</S.LocationName>
                <S.ViewMapButton type="button" onClick={handleViewMap}>
                  Ver en el mapa
                  <Map aria-hidden="true" />
                </S.ViewMapButton>
              </S.LocationContent>
            </S.LocationSection>
          )}
          <S.ContactSection>
            <S.Title $iconColor="black">
              <Phone aria-hidden="true" width="20" height="18" />
              Contacto
            </S.Title>
            <S.ContactCard>
              <S.ContactPhone>
                {`${data?.phoneNumber.areaCode} ${data?.phoneNumber.number}`}
              </S.ContactPhone>
              <S.CallButton
                type="button"
                onClick={() =>
                  openWhatsApp(
                    `${data.phoneNumber.areaCode}${data.phoneNumber.number}`,
                    `¡Hola! Me gustaría consultar por la colecta de ${data.title}`,
                  )
                }
              >
                Contactar
              </S.CallButton>
            </S.ContactCard>
          </S.ContactSection>
          <S.ShareButton type="submit">
            <Share aria-hidden="true" />
            Compartir Colecta
          </S.ShareButton>
        </S.Content>
      )}
    </S.Page>
  );
}
export default FundraisingCampaignDetail;
