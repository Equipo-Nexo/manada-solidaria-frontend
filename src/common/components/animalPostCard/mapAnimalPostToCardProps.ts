import { getAnimalName, type AnimalPost } from '@/animals/app/types/AnimalPost.types'
import type { AnimalPostCardProps } from './animalPostCard'

export const mapAnimalPostToCardProps = (
  post: AnimalPost,
): AnimalPostCardProps => ({
  postId: post.id,
  name: getAnimalName(post.name, post.animal.type),
  status: post.status,
  location: post.location.name || '',
  description: post.description,
  imageUrl: post.imageUrl,
  contactPhone: post.phoneNumber ?? undefined,
  reward: post.reward ?? undefined,
})
