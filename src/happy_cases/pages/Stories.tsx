import { useCallback, useState, useMemo } from "react";
import { ChevronRight, X } from "@/common/icons";
import * as S from "./Stories.styles";
import {
  statusLabel,
  type HappyCaseResponse,
} from "./app/api/responses/happyCasesResponses";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";
import { createPortal } from "react-dom";
import { useAutoAdvance } from "@/common/hooks/auto_advance/useAutoAdvance";
import { createPagePaws } from "@/common/utils/PagePawUtils";
type StoriesProps = {
  cases: HappyCaseResponse[];
  initialIndex: number;
  onClose: () => void;
};

function Stories({ cases, initialIndex, onClose }: StoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentCase = cases[currentIndex];
  const pagePaws = useMemo(
    () => createPagePaws(`stories-${cases.length}`),
    [cases.length],
  );
  const handleNext = useCallback(() => {
    if (currentIndex >= cases.length - 1) {
      onClose();
      return;
    }
    setCurrentIndex((index) => index + 1);
  }, [currentIndex, cases.length, onClose]);
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((current) => current - 1);
    }
  };
  const handleStoryClick = (event: React.MouseEvent) => {
    if (window.innerWidth >= 768) return;
    const clickX = event.clientX;
    const screenWidth = window.innerWidth;
    const action = clickX < screenWidth / 2 ? handlePrevious : handleNext;
    action();
  };
  useAutoAdvance({
    currentIndex,
    totalItems: cases.length,
    onNext: handleNext,
  });
  return createPortal(
    <S.Container onClick={handleStoryClick}>
      <S.PagePaws aria-hidden="true">
        {pagePaws.map((paw, index) => (
          <S.PagePaw
            key={index}
            $left={paw.left}
            $top={paw.top}
            $size={paw.size}
            $rotation={paw.rotation}
            $opacity={paw.opacity}
          />
        ))}
      </S.PagePaws>
      <S.StoryArrow
        type="button"
        $direction="previous"
        aria-label="Ver historia anterior"
        disabled={currentIndex === 0}
        onClick={(event) => {
          event.stopPropagation();
          handlePrevious();
        }}
      >
        <ChevronRight aria-hidden="true" />
      </S.StoryArrow>

      <S.StoryFrame>
        <S.BackgroundImage
          src={`${import.meta.env.VITE_CLOUDFLARE_URL}${currentCase.imageUrl}`}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = NOT_FOUND_IMAGE_URL;
          }}
        />
        <S.Overlay />

        <S.Content>
          <S.TopSection>
            <S.ProgressContainer>
              {cases.map((_, index) => (
                <S.ProgressBar key={index}>
                  <S.ProgressFill
                    $active={index === currentIndex}
                    $completed={index < currentIndex}
                  />
                </S.ProgressBar>
              ))}
            </S.ProgressContainer>
            <S.UserInfo>
              <S.UserImage
                src={`${import.meta.env.VITE_CLOUDFLARE_URL}${currentCase.owner.profileImageURL}`}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NOT_FOUND_IMAGE_URL;
                }}
              />
              <S.Username>{currentCase.owner.username}</S.Username>
              <S.CloseButton
                type="button"
                onClick={onClose}
                aria-label="Cerrar historias"
              >
                <X />
              </S.CloseButton>
            </S.UserInfo>
          </S.TopSection>
          <S.BottomContent>
            <S.Title>{currentCase.name}</S.Title>
            <S.Description>{currentCase.description}</S.Description>
            <S.StatusBadge $status={currentCase.status}>
              {statusLabel[currentCase.status]}
            </S.StatusBadge>
          </S.BottomContent>
        </S.Content>
      </S.StoryFrame>
      <S.StoryArrow
        type="button"
        $direction="next"
        aria-label="Ver historia siguiente"
        disabled={currentIndex === cases.length - 1}
        onClick={(event) => {
          event.stopPropagation();
          handleNext();
        }}
      >
        <ChevronRight aria-hidden="true" />
      </S.StoryArrow>
    </S.Container>,
    document.body,
  );
}
export default Stories;
