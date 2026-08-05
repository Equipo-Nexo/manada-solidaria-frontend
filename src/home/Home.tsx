import { useNavigate } from "react-router-dom";
import { useGetAnimalPostsQuery } from "@services/apis/animalPostsApi";
import {
  useGetCampaignsQuery,
  useGetFundraisingCampaignsQuery,
} from "@services/apis/campaignApi";
import { AnimalPostCard, CampaignCard, FundraisingCard, Carousel, Message, Advice } from "@components/index.ts";
import { mapAnimalPostToCardProps } from "@components/animalPostCard/mapAnimalPostToCardProps";
import { mapCampaignToCardData } from "@components/campaignCard/mapCampaignToCardData";
import { mapFundraisingToCardData } from "@components/fundraisingCard/mapFundraisingToCardData";
import { publicationMessages } from "@utils/Messages";
import * as S from "./Home.styles";
const MAX_POSTS_PER_SECTION = 10;

function Home() {
  const navigate = useNavigate();
  const {
    data: animalPostsData,
    isError,
    isLoading,
    refetch,
  } = useGetAnimalPostsQuery(
    {
      size: MAX_POSTS_PER_SECTION,
    },
    { refetchOnMountOrArgChange: true },
  );
  const {
    data: campaignsData,
    isError: isCampaignsError,
    isLoading: isCampaignsLoading,
    refetch: refetchCampaigns,
  } = useGetCampaignsQuery(
    { size: MAX_POSTS_PER_SECTION },
    { refetchOnMountOrArgChange: true },
  );
  const {
    data: fundraisingData,
    isLoading: isFundraisingLoading,
    isError: isFundraisingError,
    refetch: refetchFundraisings,
  } = useGetFundraisingCampaignsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const recentAnimals = animalPostsData?.content ?? [];
  const campaigns = campaignsData?.content ?? [];
  const fundraisings = fundraisingData?.content ?? [];
  return (
    <S.HomePage>
      <Carousel
        title="Casos urgentes"
        onSeeAll={() => navigate("/colectas")}
        headerContent={
          <Advice
            title="Información importante"
            advice="El progreso de la colecta no se actualiza en tiempo real. Se refleja cuando la rescatista verifica las transferencias."
          />
        }
      >
        {isFundraisingLoading && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.loading}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}

        {!isFundraisingLoading && isFundraisingError && (
          <S.MessageContainer role="alert">
            <Message
              message={publicationMessages.loadError}
              iconName="pawPrint"
            />
            <S.RetryButton
              type="button"
              onClick={() => void refetchFundraisings()}
            >
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}

        {!isFundraisingLoading &&
          !isFundraisingError &&
          fundraisings.length === 0 && (
            <S.MessageContainer>
              <Message
                message={publicationMessages.emptyUrgent}
                iconName="pawPrint"
              />
            </S.MessageContainer>
          )}
        {!isFundraisingLoading &&
          !isFundraisingError &&
          fundraisings.map((fundraising) => (
            <FundraisingCard
              key={fundraising.id}
              fundraising={mapFundraisingToCardData(fundraising)}
              showAlias={false}
            />
          ))}
      </Carousel>

      <Carousel
        title="Últimos animales publicados"
        onSeeAll={() => navigate("/animales")}
      >
        {isLoading && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.loading}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}
        {!isLoading && isError && (
          <S.MessageContainer role="alert">
            <Message
              message={publicationMessages.loadError}
              iconName="pawPrint"
            />
            <S.RetryButton type="button" onClick={() => void refetch()}>
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}
        {!isLoading && !isError && recentAnimals.length === 0 && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.emptyAnimals}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}
        {!isLoading &&
          !isError &&
          recentAnimals.map((animal) => (
            <AnimalPostCard
              key={animal.id}
              {...mapAnimalPostToCardProps(animal)}
            />
          ))}
      </Carousel>

      <Carousel
        title="Enterate de las novedades"
        onSeeAll={() => navigate("/campanias")}
      >
        {isCampaignsLoading && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.loading}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}
        {!isCampaignsLoading && isCampaignsError && (
          <S.MessageContainer role="alert">
            <Message
              message={publicationMessages.loadError}
              iconName="pawPrint"
            />
            <S.RetryButton
              type="button"
              onClick={() => void refetchCampaigns()}
            >
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}
        {!isCampaignsLoading && !isCampaignsError && campaigns.length === 0 && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.emptyCampaigns}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}
        {!isCampaignsLoading &&
          !isCampaignsError &&
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={mapCampaignToCardData(campaign)}
            />
          ))}
      </Carousel>
    </S.HomePage>
  );
}

export default Home;
