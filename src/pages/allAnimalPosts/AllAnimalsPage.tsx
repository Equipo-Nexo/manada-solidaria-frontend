import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAnimalPostsQuery } from '../../app/services/apis/animalPostsApi'
import AnimalPostCard from '../../components/animalPostCard/animalPostCard'
import { mapAnimalPostToCardProps } from '../../components/animalPostCard/mapAnimalPostToCardProps'
import CategorySelector from '../../components/categorySelector/CategorySelector'
import ArrowLeft from '../../components/icons/ArrowLeft'
import * as S from './allAnimalPosts.styles'
import {
  ANIMAL_POST_CATEGORIES,
  ANIMAL_POST_CATEGORY_LABELS,
} from '../../app/types/AnimalPost.types'
import type { AnimalPostCategory } from '../../app/types/AnimalPost.types'
import Message from '../../components/message/message'
import { publicationMessages } from '../../utils/Messages'

const PAGE_SIZE = 10

function AllAnimalsPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<AnimalPostCategory>('')
  const {
    data: animalPosts,
    isError,
    isLoading,
    refetch,
  } = useGetAnimalPostsQuery({
    type: selectedCategory || undefined,
    size: PAGE_SIZE,
  })
  const posts = animalPosts?.content ?? []
  const totalElements = animalPosts?.totalElements ?? 0

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
        categories={ANIMAL_POST_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        getCategoryLabel={(category) => ANIMAL_POST_CATEGORY_LABELS[category]}
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
          posts.map((post) => (
            <AnimalPostCard key={post.id} {...mapAnimalPostToCardProps(post)} />
          ))}
      </S.PublicationsContainer>
    </S.Page>
  )
}

export default AllAnimalsPage
