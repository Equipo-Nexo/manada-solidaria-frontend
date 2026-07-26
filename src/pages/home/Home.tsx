import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import { useGetCampaignsQuery } from '../../app/services/apis/campaignApi'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import CampaignCard from '../../components/campaignCard/CampaignCard'
import { mapCampaignToCardData } from '../../components/campaignCard/mapCampaignToCardData'
import Carousel from '../../components/carousel/Carousel'
import Message from '../../components/message/message'
import * as S from './Home.styles'
import { publicationMessages } from '../../utils/Messages'

const MAX_POSTS_PER_SECTION = 10

function Home() {
  const navigate = useNavigate()
  const { data: animalPostsData,
    isError,
    isLoading,
    refetch } = useGetAnimalPostsQuery(
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
    { size: MAX_POSTS_PER_SECTION },
    { refetchOnMountOrArgChange: true },
  )
  const recentAnimals = animalPostsData?.content ?? []
  const campaigns = campaignsData?.content ?? []

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
        {!isCampaignsLoading && !isCampaignsError && campaigns.length === 0 && (
          <S.MessageContainer>
            <Message message={publicationMessages.emptyCampaigns} iconName="pawPrint" />
          </S.MessageContainer>
        )}
        {!isCampaignsLoading && !isCampaignsError && campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={mapCampaignToCardData(campaign)}
          />
        ))}
      </Carousel>
    </S.HomePage>
  )
}

export default Home
