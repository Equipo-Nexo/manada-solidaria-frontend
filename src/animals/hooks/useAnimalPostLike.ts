import { useRef } from "react";
import {
  useLikeAnimalPostMutation,
  useDislikeAnimalPostMutation,
} from "@animals/app/api/animalPostsApi";
import { useToast } from "@/common/hooks/toast/useToast";

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
  const toast = useToast();
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
    } catch {
      toast.error(
        shouldLike
          ? "No pudimos registrar tu apoyo"
          : "No pudimos quitar tu apoyo",
        "Intentá nuevamente.",
      );
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
