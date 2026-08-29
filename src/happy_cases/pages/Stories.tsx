import { useState } from "react";
import { X } from "@/common/icons";
import * as S from "./Stories.styles";
import {
  statusLabel,
  type HappyCaseResponse,
} from "./app/api/responses/happyCasesResponses";
import { NOT_FOUND_IMAGE_URL } from "@/common/utils/CommonUtils";

type StoriesProps = {
  cases: HappyCaseResponse[];
  initialIndex: number;
  onClose: () => void;
};

function Stories({ cases, initialIndex, onClose }: StoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentCase = cases[currentIndex];
  const handleNext = () => {
    if (currentIndex < cases.length - 1) {
      setCurrentIndex((current) => current + 1);
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((current) => current - 1);
    }
  };
  const handleStoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const isLeftSide = event.clientX < window.innerWidth / 2;
    isLeftSide ? handlePrevious() : handleNext();
  };
  return (
    <S.Container onClick={handleStoryClick}>
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
                  <S.ProgressFill $active={index === currentIndex} />
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
    </S.Container>
  );
}
export default Stories;
