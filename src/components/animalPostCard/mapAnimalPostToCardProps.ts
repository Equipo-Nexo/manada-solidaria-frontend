import type { AnimalPost } from '../../app/services/requests/animalPostRequests'
import type { AnimalPostCardProps } from './animalPostCard'

const getName = (post: AnimalPost) => {
  if (post.name?.trim()) {
    return post.name
  }

  return post.animal.type === 'DOG' ? 'Perro' : 'Gato'
}

export const mapAnimalPostToCardProps = (
  post: AnimalPost,
): AnimalPostCardProps => ({
  name: getName(post),
  status: post.status,
  location: post.location.name,
  description: post.description,
  imageUrl: post.imageUrl,
  contactPhone: post.phoneNumber ?? undefined,
  reward: post.reward ?? undefined,
})
