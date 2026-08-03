import { useRef, useState } from "react";
import { NOT_FOUND_IMAGE_URL } from "../../utils/CommonUtils";
import { Check } from "../icons";
import * as S from "./FundraisingCard.styles";
import Copy from "../icons/Copy";
import Transfer from "../icons/Transfer";

export type FundraisingCardData = {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  accountAlias: string;
  amountToBeCollected?: number | string;
  storyLabel?: string;
};

type FundraisingCardProps = {
  fundraising: FundraisingCardData;
  className?: string;
  onCopyAlias?: (fundraising: FundraisingCardData) => void;
  onViewStory?: (fundraising: FundraisingCardData) => void;
  showAlias?: boolean;
};

const formatAmount = (amount: number | string) => {
  if (typeof amount === "string") {
    return amount;
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
};

function FundraisingCard({
  fundraising,
  className,
  onCopyAlias,
  onViewStory,
  showAlias = true,
}: FundraisingCardProps) {
  const storyLabel = fundraising.storyLabel ?? "Conocé su historia";
  const hasGoal = fundraising.amountToBeCollected != null;
  const progress = 0;
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
    }, 1000);
  };
  return (
    <S.Card className={className} $showAlias={showAlias}>
      <S.CaseCard>
        <S.ImageContainer>
          <S.CaseImage
            src={fundraising.imageUrl || NOT_FOUND_IMAGE_URL}
            alt={fundraising.imageAlt ?? fundraising.title}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NOT_FOUND_IMAGE_URL;
            }}
          />
        </S.ImageContainer>

        <S.CaseContent>
          <S.Title>{fundraising.title}</S.Title>
          <S.Description>{fundraising.description}</S.Description>
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
          <S.GoalText>
            Meta a recaudar: {formatAmount(fundraising.amountToBeCollected!)}
          </S.GoalText>

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
