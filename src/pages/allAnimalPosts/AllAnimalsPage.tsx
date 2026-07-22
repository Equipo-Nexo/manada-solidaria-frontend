import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import type {
  AnimalPostBackendStatus,
  GetAnimalPostsRequest,
} from '../../app/services/requests/animalPostRequests'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import ArrowLeft from '../../components/icons/ArrowLeft'
import * as S from './allAnimalPosts.styles'
import { AnimalPostType } from '../../app/types/AnimalPost.types'

type Category = 'Todos' | 'Adopción' | 'Perdidos' | 'En la calle'

const categories: Category[] = ['Todos', 'Adopción', 'Perdidos', 'En la calle']
const PAGE_SIZE = 10

const getRequestFilters = (
  category: Category,
): Pick<GetAnimalPostsRequest, 'status' | 'type'> => {
  if (category === 'Adopción') {
    return { type: AnimalPostType.Adoption }
  }

  if (category === 'Perdidos' || category === 'En la calle') {
    return { status: 'CREATED' satisfies AnimalPostBackendStatus }
  }

  return {}
}

function AllAnimalsPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos')
  const {
    data,
    isError,
    isLoading,
    refetch,
  } = useGetAnimalPostsQuery({
    ...getRequestFilters(selectedCategory),
    size: PAGE_SIZE,
  })
  const posts = data?.content ?? []
  const totalElements = data?.totalElements ?? 0

  return (
    <S.Page>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>
        <S.TitlesContainer>
          <S.PageTitle>Animales publicados</S.PageTitle>
          <S.PageSubtitle>
            {isLoading ? 'Cargando resultados...' : `${totalElements} resultados`}
          </S.PageSubtitle>
        </S.TitlesContainer>
      </S.Header>

      <S.CategoriesSelectorContainer aria-label="Filtrar publicaciones por categoría">
        {categories.map((category) => (
          <S.Category
            key={category}
            type="button"
            $isSelected={category === selectedCategory}
            aria-pressed={category === selectedCategory}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </S.Category>
        ))}
      </S.CategoriesSelectorContainer>

      <S.PublicationsContainer aria-live="polite">
        {isLoading && <S.StateMessage>Cargando publicaciones...</S.StateMessage>}

        {isError && (
          <S.StateMessage role="alert">
            No pudimos cargar las publicaciones.
            <S.RetryButton type="button" onClick={() => void refetch()}>
              Reintentar
            </S.RetryButton>
          </S.StateMessage>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <S.StateMessage>No hay publicaciones para esta categoría.</S.StateMessage>
        )}

        {!isLoading &&
          !isError &&
          posts.map((post) => {
            const displayContext = selectedCategory === 'En la calle' ? 'street' : 'default'

            return (
              <AnimalPostCard
                key={post.id}
                {...mapAnimalPostToCardProps(post, displayContext)}
              />
            )
          })}
      </S.PublicationsContainer>
    </S.Page>
  )
}

export default AllAnimalsPage
