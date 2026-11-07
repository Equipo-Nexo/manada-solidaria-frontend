import {
  useId,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { AnimalPostStatus } from "@utils/AnimalPostUtils";
import { Heart, LocationPin, Share } from "../../icons";
import { getAnimalPostActions } from "./animalPostActions";
import * as S from "./animalPostCard.styles";
import { ANIMAL_POST_STATUS_LABELS } from "@/animals/utils/AnimalFormUtils";
import type { PhoneNumber } from "@/common/app/services/responses/PhoneNumber";
import type { Location } from "@/common/app/services/responses/Location";
import ImagePreview from "../image_preview/ImagePreview";
import { shareUrl } from "@/common/utils/HandleShare";
import { normalizeImageUrl } from "@/common/utils/CommonUtils";
import { useAnimalPostLike } from "@/animals/hooks/useAnimalPostLike";
import { useDoubleTap } from "@/common/hooks/gestures/useDoubleTap";
import PostActionsMenu from "../post_actions_menu/PostActionsMenu";

export type AnimalPostCardProps = {
  postId: string;
  name?: string;
  status?: string;
  location?: Location;
  description?: string;
  imageUrl?: string;
  phoneNumber?: PhoneNumber;
  reward?: number;
  reactedByMe?: boolean;
  reactionsCount?: number;
};
type HeartAnimation = {
  x: number;
  y: number;
  id: number;
};
function AnimalPostCard({
  postId,
  name,
  status,
  location,
  description,
  imageUrl,
  phoneNumber,
  reward,
  reactedByMe = false,
  reactionsCount = 0,
}: AnimalPostCardProps) {
  const navigate = useNavigate();
  const heartGradientId = useId();
  const heartSequence = useRef(0);
  const photoPointerType = useRef<string | null>(null);
  const [isRewardExpanded, setIsRewardExpanded] = useState(false);

  const [heartAnimation, setHeartAnimation] = useState<HeartAnimation | null>(
    null,
  );
  const { toggleLike, giveLike, isUpdatingLike } = useAnimalPostLike({
    postId,
    reactedByMe,
  });
  const handlePhotoLike = (
    event: MouseEvent<HTMLElement> | PointerEvent<HTMLElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setHeartAnimation({
      x,
      y,
      id: heartSequence.current++,
    });
    if (reactedByMe || isUpdatingLike) return;
    void giveLike();
  };
  const handlePhotoDoubleClick = (event: MouseEvent<HTMLElement>) => {
    // Touch is handled by useDoubleTap, including browsers emitting a MouseEvent afterward.
    if (photoPointerType.current === "touch") return;
    if (event.target instanceof Element && event.target.closest("button, a")) {
      return;
    }
    if (
      "pointerType" in event.nativeEvent &&
      event.nativeEvent.pointerType !== "mouse"
    ) {
      return;
    }
    handlePhotoLike(event);
  };
  const doubleTapHandlers = useDoubleTap({
    onDoubleTap: handlePhotoLike,
  });
  const hasReward =
    status === ANIMAL_POST_STATUS_LABELS.LOST &&
    typeof reward === "number" &&
    Number.isFinite(reward) &&
    reward > 0;
  const formattedReward = hasReward
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(reward)
    : undefined;

  const visibleActions = status
    ? getAnimalPostActions(AnimalPostStatus[status].text, phoneNumber)
    : [];

  const handleViewOnMap = (latitude: number, longitude: number) => {
    navigate(`/mapa?latitude=${latitude}&longitude=${longitude}`);
  };
  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest("button, a")) {
      return;
    }
    navigate(`/animal/detalle/${postId}`);
  };

  const handleShareButton = () => {
    shareUrl({
      path: `?redirect=/animal/detalle/${postId}`,
      text: "Mirá este animalito para ayudar.",
      imageUrl: normalizeImageUrl(imageUrl, true),
    });
  };

  return (
    <S.CardContainer>
      <S.PhotoContainer
        onPointerDownCapture={(event) => {
          photoPointerType.current = event.pointerType;
        }}
        onDoubleClick={handlePhotoDoubleClick}
        {...doubleTapHandlers}
      >
        <ImagePreview imageId={imageUrl} alt={name} />
        {heartAnimation && (
          <S.PhotoHeart
            key={heartAnimation.id}
            $x={heartAnimation.x}
            $y={heartAnimation.y}
            $tone={heartAnimation.id % 4}
            aria-hidden="true"
            onAnimationEnd={() => setHeartAnimation(null)}
          >
            <Heart filled fill={`url(#${heartGradientId})`}>
              <defs>
                <linearGradient
                  id={heartGradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" />
                  <stop offset="65%" />
                </linearGradient>
              </defs>
            </Heart>
          </S.PhotoHeart>
        )}
        <S.PostActionsContainer>
          <PostActionsMenu
            postId={postId}
            type="ANIMAL_POST"
            onShare={handleShareButton}
          />
        </S.PostActionsContainer>
      </S.PhotoContainer>

      <S.Content onClick={handleCardClick}>
        <S.MainInfoContainer>
          <S.Title>{name}</S.Title>
          <S.BadgesContainer>
            {formattedReward && (
              <S.RewardInfo
                type="button"
                $expanded={isRewardExpanded}
                aria-expanded={isRewardExpanded}
                aria-label={
                  isRewardExpanded
                    ? `Ocultar recompensa de ${formattedReward}`
                    : `Mostrar recompensa de ${formattedReward}`
                }
                title={`Se ofrece una recompensa de ${formattedReward}`}
                onClick={() => setIsRewardExpanded((isExpanded) => !isExpanded)}
              >
                <span>{isRewardExpanded ? formattedReward : "$"}</span>
              </S.RewardInfo>
            )}
            {status && (
              <S.StatusContainer
                $color={AnimalPostStatus[status].fontColor}
                $background={AnimalPostStatus[status].backgroundColor}
              >
                {AnimalPostStatus[status].text}
              </S.StatusContainer>
            )}
          </S.BadgesContainer>
        </S.MainInfoContainer>

        {location?.city && (
          <S.Location>
            <LocationPin aria-hidden="true" />
            <span>{location.city}</span>
          </S.Location>
        )}

        <S.Description>{description}</S.Description>
        <S.ViewMore
          type="button"
          onClick={() => navigate(`/animal/detalle/${postId}`)}
        >
          Ver más información
        </S.ViewMore>
        <S.LikesContainer>
          <S.LikeButton
            type="button"
            onClick={toggleLike}
            disabled={isUpdatingLike}
            $isLiked={reactedByMe}
            aria-pressed={reactedByMe}
            aria-label={reactedByMe ? "Quitar apoyo" : "Dar apoyo"}
          >
            <Heart filled={reactedByMe} aria-hidden="true" />
          </S.LikeButton>
          <S.LikesCount>
            {reactionsCount} {reactionsCount === 1 ? "apoyo" : "apoyos"}
          </S.LikesCount>
        </S.LikesContainer>
        {visibleActions.length > 0 && (
          <S.ButtonsContainer $amount={visibleActions.length}>
            {visibleActions.map(({ id, label, variant, to, onClick }) => (
              <S.ActionButton
                key={id}
                type="button"
                $variant={variant}
                onClick={() => {
                  if (to) {
                    navigate(
                      generatePath(to, { postId: encodeURIComponent(postId) }),
                    );
                    return;
                  }
                  onClick?.(
                    phoneNumber,
                    name,
                    location
                      ? () =>
                          handleViewOnMap(location.latitude, location.longitude)
                      : undefined,
                  );
                }}
              >
                {label}
              </S.ActionButton>
            ))}
          </S.ButtonsContainer>
        )}
      </S.Content>
    </S.CardContainer>
  );
}

export default AnimalPostCard;
