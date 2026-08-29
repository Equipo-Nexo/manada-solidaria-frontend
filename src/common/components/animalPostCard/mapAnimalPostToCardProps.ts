import { getAnimalName, type AnimalPost } from '@/animals/app/types/AnimalPost.types'
import type { AnimalPostCardProps } from './animalPostCard'

export const mapAnimalPostToCardProps = (
  post: AnimalPost,
): AnimalPostCardProps => ({
  postId: post.id,
  name: getAnimalName(post.name, post.animal.type),
  status: post.status,
  location: post.location,
  description: post.description,
  imageUrl: post.imageUrl,
  phoneNumber: post.phoneNumber,
  reward: post.reward ?? undefined,
  
})
