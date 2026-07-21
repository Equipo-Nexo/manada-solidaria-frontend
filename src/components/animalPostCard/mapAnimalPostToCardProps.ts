import type { AnimalPost } from '../../app/services/requests/animalPostRequests'
import type { AnimalPostCardProps } from './animalPostCard'
import type { AnimalPostStatus } from './animalPostCard.styles'

export type AnimalPostDisplayContext = 'default' | 'street'

const getStatus = (
  post: AnimalPost,
  context: AnimalPostDisplayContext,
): AnimalPostStatus => {
  if (context === 'street') {
    return 'En la calle'
  }

  if (post.type === 'LOST') {
    return 'Perdido'
  }

  return post.status === 'SEARCHING_ADOPT' ? 'En tránsito' : 'En adopción'
}

const getName = (post: AnimalPost) => {
  if (post.name?.trim()) {
    return post.name
  }

  return post.animal.type === 'DOG' ? 'Perro' : 'Gato'
}

export const mapAnimalPostToCardProps = (
  post: AnimalPost,
  context: AnimalPostDisplayContext = 'default',
): AnimalPostCardProps => ({
  name: getName(post),
  status: getStatus(post, context),
  location: post.location.name,
  description: post.description,
  imageUrl: post.imageUrl,
  contactPhone: post.phoneNumber ?? undefined,
})
