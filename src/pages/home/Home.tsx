import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import { useGetCampaignsQuery } from '../../app/services/apis/campaignApi'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import CampaignCard, { type CampaignCardData } from '../../components/campaignCard/CampaignCard'
import Carousel from '../../components/carrousel/Carousel'
import Message from '../../components/message/message'
import * as S from './Home.styles'

const MAX_POSTS_PER_SECTION = 10

function Home() {
  const navigate = useNavigate()
  const { data: animalPostsData, isError, isLoading } = useGetAnimalPostsQuery({
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
    imageUrl: campaign.imageId,
    type: campaign.type,
  }))

  return (
    <S.HomePage>
      <Carousel title="Casos urgentes">
        <S.MessageContainer>
          <Message message="Aún no se realizaron publicaciones." iconName="pawPrint" />
        </S.MessageContainer>
      </Carousel>

      <Carousel title="Últimos animales publicados" onSeeAll={() => navigate('/animales')}>
        {isLoading && <S.CarouselMessage>Cargando publicaciones...</S.CarouselMessage>}
        {!isLoading && isError && (
          <S.MessageContainer role="alert">
            <Message message="Ha ocurrido un error, intenta recargar" iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isLoading && !isError && recentAnimals.length === 0 && (
          <S.MessageContainer>
            <Message message="No hay publicaciones recientes de animales aún" iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isLoading && !isError && recentAnimals.map((animal) => (
          <AnimalPostCard key={animal.id} {...mapAnimalPostToCardProps(animal)} />
        ))}
      </Carousel>

      <Carousel title="Enterate de las novedades" onSeeAll={() => navigate('/campanias')}>
        {campaignCards.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </Carousel>
    </S.HomePage>
  )
}

export default Home
