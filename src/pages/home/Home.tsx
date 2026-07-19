import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import { ChevronRight } from '../../components/icons'
import * as S from './Home.styles'

const MAX_POSTS_PER_SECTION = 10

function Home() {
  const navigate = useNavigate()
  const { data, isError, isLoading, refetch } = useGetAnimalPostsQuery({
    size: MAX_POSTS_PER_SECTION,
  })
  const recentAnimals = data?.content ?? []

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
        <S.SectionHeader>
          <S.SectionTitle id="news-title">
            Enterate de las novedades
          </S.SectionTitle>
          <S.ViewAllButton type="button" aria-label="Ver todas las novedades">
            <span>Ver todos</span>
            <ChevronRight aria-hidden="true" />
          </S.ViewAllButton>
        </S.SectionHeader>
        <S.Carousel aria-label="Campañas y novedades">
        </S.Carousel>
      </S.Section>
    </S.HomePage>
  )
}

export default Home
