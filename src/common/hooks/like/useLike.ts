import { useRef, useState } from "react";
import { useToast } from "@/common/hooks/toast/useToast";

type UseLikeProps = {
  reactedByMe: boolean;
  onLike: () => Promise<unknown>;
  onDislike: () => Promise<unknown>;
  likeErrorMessage?: string;
  dislikeErrorMessage?: string;
};

export function useLike({
  reactedByMe,
  onLike,
  onDislike,
  likeErrorMessage = "No pudimos registrar tu apoyo",
  dislikeErrorMessage = "No pudimos quitar tu apoyo",
}: UseLikeProps) {
  const toast = useToast();
  const isPendingRef = useRef(false);
  const [isUpdatingLike, setIsUpdatingLike] = useState(false);

  const executeLike = async (shouldLike: boolean): Promise<boolean> => {
    if (isPendingRef.current) return false;
    if (reactedByMe === shouldLike) return false;

    isPendingRef.current = true;
    setIsUpdatingLike(true);

    try {
      if (shouldLike) {
        await onLike();
      } else {
        await onDislike();
      }

      return true;
    } catch {
      toast.error(
        shouldLike ? likeErrorMessage : dislikeErrorMessage,
        "Intentá nuevamente.",
      );

      return false;
    } finally {
      isPendingRef.current = false;
      setIsUpdatingLike(false);
    }
  };

  const toggleLike = () => executeLike(!reactedByMe);
  const giveLike = () => executeLike(true);

  return {
    toggleLike,
    giveLike,
    isUpdatingLike,
  };
}
