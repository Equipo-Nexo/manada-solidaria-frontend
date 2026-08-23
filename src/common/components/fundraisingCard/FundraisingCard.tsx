import { useRef, useState } from "react";
import { NOT_FOUND_IMAGE_URL } from "@utils/CommonUtils";
import { Check } from "../../icons";
import * as S from "./FundraisingCard.styles";
import Copy from "../../icons/Copy";
import Transfer from "../../icons/Transfer";
import ImagePreview from "../image_preview/ImagePreview";

export type FundraisingCardData = {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  accountAlias: string;
  amountToBeCollected?: number | null;
  amountCollected?: number | null;
  storyLabel?: string;
};

type FundraisingCardProps = {
  fundraising: FundraisingCardData;
  className?: string;
  onCopyAlias?: (fundraising: FundraisingCardData) => void;
  onViewStory?: (fundraising: FundraisingCardData) => void;
  showAlias?: boolean;
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);

function FundraisingCard({
  fundraising,
  className,
  onCopyAlias,
  onViewStory,
  showAlias = true,
}: FundraisingCardProps) {
  const storyLabel = fundraising.storyLabel ?? "Conocé su historia";
  const goal = fundraising.amountToBeCollected;
  const collected = fundraising.amountCollected ?? 0;
  const hasGoal = goal != null && goal > 0;

  const progress = hasGoal
    ? Math.min(100, Math.round((collected / goal) * 100))
    : 0;
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const handleCopyAlias = async () => {
    await navigator.clipboard
      .writeText(fundraising.accountAlias)
      .catch(() => undefined);

    onCopyAlias?.(fundraising);

    setCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <S.Card className={className} $showAlias={showAlias}>
      <S.CaseCard>
        <S.ImageContainer>
          <ImagePreview 
            imageId={fundraising.imageUrl}
            alt={fundraising.title}
          />
        </S.ImageContainer>

        <S.CaseContent>
          <S.Title>{fundraising.title}</S.Title>
          <S.Description $hasGoal={hasGoal}>
            {fundraising.description}
          </S.Description>
          <S.StoryButton
            type="button"
            onClick={() => onViewStory?.(fundraising)}
          >
            {storyLabel}
          </S.StoryButton>
        </S.CaseContent>
      </S.CaseCard>
      {hasGoal && (
        <S.ProgressSection>
          <S.GoalText>Meta a recaudar: {formatAmount(goal)}</S.GoalText>

          <S.ProgressTrack aria-label={`Progreso de la colecta: ${progress}%`}>
            <S.ProgressValue $progress={progress} />
          </S.ProgressTrack>
        </S.ProgressSection>
      )}
      {showAlias && (
        <S.AliasBox>
          <Transfer aria-hidden="true" />
          <S.AliasContent>
            <S.AliasLabel>ALIAS PARA TRANSFERIR</S.AliasLabel>
            <S.AliasValue>{fundraising.accountAlias}</S.AliasValue>
          </S.AliasContent>
        </S.AliasBox>
      )}
      <S.CopyButton type="button" onClick={handleCopyAlias}>
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {copied ? "Alias copiado" : "Copiar alias"}
      </S.CopyButton>
    </S.Card>
  );
}

export default FundraisingCard;
