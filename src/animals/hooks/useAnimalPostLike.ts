import {
  useLikeAnimalPostMutation,
  useDislikeAnimalPostMutation,
} from "@animals/app/api/animalPostsApi";
import { useLike } from "@/common/hooks/like/useLike";

type UseAnimalPostLikeProps = {
  postId: string;
  reactedByMe: boolean;
};

export function useAnimalPostLike({
  postId,
  reactedByMe,
}: UseAnimalPostLikeProps) {
  const [likeAnimalPost] = useLikeAnimalPostMutation();
  const [dislikeAnimalPost] = useDislikeAnimalPostMutation();

  return useLike({
    reactedByMe,
    onLike: () => likeAnimalPost(postId).unwrap(),
    onDislike: () => dislikeAnimalPost(postId).unwrap(),
  });
}
