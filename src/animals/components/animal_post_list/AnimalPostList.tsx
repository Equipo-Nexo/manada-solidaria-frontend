import type { AnimalPost } from '@/animals/app/types/AnimalPost.types'
import * as S from './AnimalPostList.styles'
import { AnimalPostCard } from '@/common/components'
import { mapAnimalPostToCardProps } from '@/common/components/animalPostCard/mapAnimalPostToCardProps'

export default function AnimalPostList({
  posts
}: { posts: AnimalPost[] }) {
  return (
    <S.Content>

      <S.ListContainer>
        {
          posts.map((post) => {
            return (
              <AnimalPostCard
                key={post.id}
                {...mapAnimalPostToCardProps(post)}
              />
            )
          })
        }
      </S.ListContainer>
    </S.Content>
  )
}