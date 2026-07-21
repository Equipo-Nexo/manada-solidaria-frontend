import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import { ChevronRight } from '../../components/icons'
import * as S from './Home.styles'
import { useGetCampaignsQuery } from "../../app/services/apis/campaignApi";
import type { CampaignCardData } from "../../components/campaignCard/CampaignCard";
import CampaignCarousel from "./campaignCarousel/CampaignCarousel";

const MAX_POSTS_PER_SECTION = 10

function Home() {
  const navigate = useNavigate()
  const { data: animalPostsData, isError, isLoading, refetch } = useGetAnimalPostsQuery({
    size: MAX_POSTS_PER_SECTION,
  })
  const { data: campaignsData } = useGetCampaignsQuery({})
  const recentAnimals = animalPostsData?.content ?? []
  const campaigns = campaignsData?.content ?? []
  const campaignCards: CampaignCardData[] = campaigns.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    location: campaign.location.name,
    imageUrl: "https://placehold.co/600x400",
    type: campaign.type,
  }))

  return (
    <S.HomePage>
      <S.Section aria-labelledby="urgent-cases-title">
        <S.SectionHeader>
          <S.SectionTitle id="urgent-cases-title">Casos urgentes</S.SectionTitle>
          <S.ViewAllButton type="button" aria-label="Ver todos los casos urgentes">
            <span>Ver todos</span>
            <ChevronRight aria-hidden="true" />
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.Carousel aria-label="Casos urgentes">
        </S.Carousel>
      </S.Section>

      <S.Section aria-labelledby="recent-animals-title">
        <S.SectionHeader>
          <S.SectionTitle id="recent-animals-title">
            Últimos animales publicados
          </S.SectionTitle>
          <S.ViewAllButton
            type="button"
            aria-label="Ver todos los animales publicados"
            onClick={() => navigate('/animales')}
          >
            <span>Ver todos</span>
            <ChevronRight aria-hidden="true" />
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.Carousel aria-label="Últimos animales publicados">
          {isLoading && <S.CarouselMessage>Cargando publicaciones...</S.CarouselMessage>}
          {isError && (
            <S.CarouselMessage role="alert">
              No pudimos cargar las publicaciones.
              <S.RetryButton type="button" onClick={() => void refetch()}>
                Reintentar
              </S.RetryButton>
            </S.CarouselMessage>
          )}
          {!isLoading && !isError && recentAnimals.length === 0 && (
            <S.CarouselMessage>No hay publicaciones recientes.</S.CarouselMessage>
          )}
          {!isLoading && !isError && recentAnimals.map((animal) => (
            <S.AnimalCardSlot key={animal.id}>
              <AnimalPostCard {...mapAnimalPostToCardProps(animal)} />
            </S.AnimalCardSlot>
          ))}
        </S.Carousel>
      </S.Section>

      <S.Section aria-labelledby="news-title">
        <CampaignCarousel
          title="Enterate de las novedades"
          campaigns={campaignCards}
          onSeeAll={() => navigate("/campanias")}
        />
      </S.Section>
    </S.HomePage>
  )
}

export default Home;
