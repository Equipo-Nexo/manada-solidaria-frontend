import { useNavigate } from "react-router-dom";
import { useGetAnimalPostsQuery } from "@animals/app/api/animalPostsApi";
import {
  useGetCampaignsQuery,
  useGetFundraisingCampaignsQuery,
} from "@campaigns/app/api/campaignApi";
import {
  AnimalPostCard,
  CampaignCard,
  FundraisingCard,
  Carousel,
  Message,
  Advice,
  VetGuardButton,
} from "@components/index.ts";
import { mapAnimalPostToCardProps } from "@components/animalPostCard/mapAnimalPostToCardProps";
import { mapFundraisingToCardData } from "@components/fundraisingCard/mapFundraisingToCardData";
import { publicationMessages } from "@utils/Messages";
import * as S from "./Home.styles";
import { mapCampaignToCardData } from "@/campaigns/utils/CampaignUtils";
import CarouselSlider from "@/common/components/carousel_slider/CarouselSlider";
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
      <VetGuardButton />
      <Carousel
        title="Casos urgentes"
        onSeeAll={() => navigate("/colectas")}
        allowContentOverflow
        highlightNavigationOnHover
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
          fundraisings.length > 0 && (
            <CarouselSlider
              items={fundraisings}
              visibleItems={4}
              indicatorMode="seen"
              autoAdvance={false}
              showArrowsOnHover
              hideArrowsOnMobile
              renderItem={(fundraising) => (
                <FundraisingCard
                  fundraising={mapFundraisingToCardData(fundraising)}
                  showAlias={false}
                  onViewStory={(fundraising) => {
                    navigate(`/colectas/${fundraising.id}`);
                  }}
                />
              )}
            />
          )}
      </Carousel>

      <Carousel
        title="Últimos animales publicados"
        onSeeAll={() => navigate("/animales")}
        allowContentOverflow
        highlightNavigationOnHover
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
        {!isLoading && !isError && recentAnimals.length > 0 && (
          <CarouselSlider
            items={recentAnimals}
            visibleItems={4}
            indicatorMode="seen"
            autoAdvance={false}
            showArrowsOnHover
            hideArrowsOnMobile
            renderItem={(recentAnimal) => (
              <AnimalPostCard {...mapAnimalPostToCardProps(recentAnimal)} />
            )}
          />
        )}
      </Carousel>

      <Carousel
        title="Enterate de las novedades"
        allowContentOverflow
        highlightNavigationOnHover
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

        {!isCampaignsLoading && !isCampaignsError && campaigns.length > 0 && (
          <CarouselSlider
            items={campaigns}
            visibleItems={4}
            indicatorMode="seen"
            autoAdvance={false}
            showArrowsOnHover
            hideArrowsOnMobile
            renderItem={(campaign) => (
              <CampaignCard
                campaign={mapCampaignToCardData(campaign)}
                onMoreInfo={(selectedCampaign) => {
                  navigate(`/campanias/${selectedCampaign.id}`);
                }}
              />
            )}
          />
        )}
      </Carousel>
    </S.HomePage>
  );
}

export default Home;
