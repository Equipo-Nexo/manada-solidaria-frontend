import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import { useGetCampaignsQuery } from '../../app/services/apis/campaignApi'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import CampaignCard, { type CampaignCardData } from '../../components/campaignCard/CampaignCard'
import Carousel from '../../components/carrousel/Carousel'
import Message from '../../components/message/message'
import * as S from './Home.styles'
import { publicationMessages } from '../../utils/Messages'

const MAX_POSTS_PER_SECTION = 10

function Home() {
  const navigate = useNavigate()
  const { data: animalPostsData, isError, isLoading, refetch } = useGetAnimalPostsQuery(
    {
      size: MAX_POSTS_PER_SECTION,
    },
    { refetchOnMountOrArgChange: true },
  )
  const {
    data: campaignsData,
    isError: isCampaignsError,
    isLoading: isCampaignsLoading,
    refetch: refetchCampaigns,
  } = useGetCampaignsQuery(
    {},
    { refetchOnMountOrArgChange: true },
  )
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
          <Message message={publicationMessages.emptyUrgent} iconName="pawPrint" />
        </S.MessageContainer>
      </Carousel>

      <Carousel title="Últimos animales publicados" onSeeAll={() => navigate('/animales')}>
        {isLoading && (
          <S.MessageContainer>
            <Message message={publicationMessages.loading} iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isLoading && isError && (
          <S.MessageContainer role="alert">
            <Message message={publicationMessages.loadError} iconName="pawPrint" />
            <S.RetryButton type="button" onClick={() => void refetch()}>
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}
        {!isLoading && !isError && recentAnimals.length === 0 && (
          <S.MessageContainer>
            <Message message={publicationMessages.emptyAnimals} iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isLoading && !isError && recentAnimals.map((animal) => (
          <AnimalPostCard key={animal.id} {...mapAnimalPostToCardProps(animal)} />
        ))}
      </Carousel>

      <Carousel title="Enterate de las novedades" onSeeAll={() => navigate('/campanias')}>
        {isCampaignsLoading && (
          <S.MessageContainer>
            <Message message={publicationMessages.loading} iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isCampaignsLoading && isCampaignsError && (
          <S.MessageContainer role="alert">
            <Message message={publicationMessages.loadError} iconName="pawPrint" />
            <S.RetryButton type="button" onClick={() => void refetchCampaigns()}>
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}
        {!isCampaignsLoading && !isCampaignsError && campaignCards.length === 0 && (
          <S.MessageContainer>
            <Message message={publicationMessages.emptyCampaigns} iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isCampaignsLoading && !isCampaignsError && campaignCards.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </Carousel>
    </S.HomePage>
  )
}

export default Home
