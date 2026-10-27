import { useRef } from "react";
import {
  useLikeAnimalPostMutation,
  useDislikeAnimalPostMutation,
} from "@animals/app/api/animalPostsApi";

type UseAnimalPostLikeProps = {
  postId: string;
  reactedByMe: boolean;
};

export function useAnimalPostLike({
  postId,
  reactedByMe,
}: UseAnimalPostLikeProps) {
  const [likeAnimalPost, { isLoading: isLiking }] = useLikeAnimalPostMutation();
  const [dislikeAnimalPost, { isLoading: isDisliking }] =
    useDislikeAnimalPostMutation();
  const isPendingRef = useRef(false);
  const executeLike = async (shouldLike: boolean): Promise<boolean> => {
    if (isPendingRef.current) return false;
    if (reactedByMe === shouldLike) return false;
    isPendingRef.current = true;
    try {
      if (shouldLike) {
        await likeAnimalPost(postId).unwrap();
      } else {
        await dislikeAnimalPost(postId).unwrap();
      }
      return true;
    } catch (error) {
      console.error("Error al actualizar el like:", error);
      return false;
    } finally {
      isPendingRef.current = false;
    }
  };

  const toggleLike = () => executeLike(!reactedByMe);
  const giveLike = () => executeLike(true);
  return {
    toggleLike,
    giveLike,
    isUpdatingLike: isLiking || isDisliking,
  };
}
