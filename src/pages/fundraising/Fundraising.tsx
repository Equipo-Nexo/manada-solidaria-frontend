import { useNavigate } from "react-router-dom";
import { useGetFundraisingCampaignsQuery } from "../../app/services/apis/campaignApi";
import { mapFundraisingToCardData } from "../../components/fundraisingCard/mapFundraisingToCardData";
import FundraisingList from "./FundraisingList";
import * as S from "../campaigns/Campaigns.styles";
import { ArrowLeft } from "../../components/icons";
import AdviceComponent from "../../components/advice/AdviceComponent";

function Fundraising() {
  const navigate = useNavigate();

  const { data, isError, isLoading, refetch } =
    useGetFundraisingCampaignsQuery();

  const fundraisings = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;

  const fundraisingCards = fundraisings.map(mapFundraisingToCardData);

  return (
    <S.Page>
      <S.Header>
        <S.BackButton
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>

        <S.TitlesContainer>
          <S.PageTitle>Casos urgentes</S.PageTitle>

          <S.PageSubtitle>
            {isLoading
              ? "Cargando resultados..."
              : `${totalElements} ${
                  totalElements === 1 ? "resultado" : "resultados"
                }`}
          </S.PageSubtitle>
        </S.TitlesContainer>
      </S.Header>
      <S.AdviceContainer>
        <AdviceComponent
          title="Información importante"
          advice="El progreso de la colecta no se actualiza en tiempo real. Se refleja cuando la rescatista verifica las transferencias."
        />
      </S.AdviceContainer>

      <FundraisingList
        fundraisings={fundraisingCards}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
      />
    </S.Page>
  );
}

export default Fundraising;
