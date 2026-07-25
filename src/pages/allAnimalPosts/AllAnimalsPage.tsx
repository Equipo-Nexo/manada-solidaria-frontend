import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import type {
  AnimalPostBackendStatus,
  GetAnimalPostsRequest,
} from '../../app/services/requests/animalPostRequests'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import CategorySelector from '../../components/categorySelector/CategorySelector'
import ArrowLeft from '../../components/icons/ArrowLeft'
import * as S from './allAnimalPosts.styles'
import { AnimalPostType } from '../../app/types/AnimalPost.types'
import Message from '../../components/message/message'
import { publicationMessages } from '../../utils/Messages'

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
            {isLoading
              ? 'Cargando resultados...'
              : `${totalElements} ${totalElements === 1 ? 'resultado' : 'resultados'}`}
          </S.PageSubtitle>
        </S.TitlesContainer>
      </S.Header>

      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        ariaLabel="Filtrar publicaciones por categoría"
      />

      <S.PublicationsContainer aria-live="polite">
        {isLoading && (
          <S.MessageContainer>
            <Message message={publicationMessages.loading} iconName="pawPrint" />
          </S.MessageContainer>
        )}

        {isError && (
          <S.MessageContainer role="alert">
            <Message message={publicationMessages.loadError} iconName="pawPrint" />
            <S.RetryButton type="button" onClick={() => void refetch()}>
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <S.MessageContainer>
            <Message message={publicationMessages.emptyCategory} iconName="pawPrint" />
          </S.MessageContainer>
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
