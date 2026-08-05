import type { FundraisingCardData } from "@components/fundraisingCard/FundraisingCard";
import { FundraisingCard, Message } from "@components/index.ts";
import * as S from "@campaigns/components/campaign_list/CampaignList.styles";
import { publicationMessages } from "@utils/Messages";

type FundraisingListProps = {
  fundraisings: FundraisingCardData[];
  isError: boolean;
  isLoading: boolean;
  onRetry: () => void;
  advice?: React.ReactNode;
};

function FundraisingList({
  fundraisings,
  isError,
  isLoading,
  onRetry,
  advice,
}: FundraisingListProps) {
  if (isLoading) {
    return (
      <S.MessageContainer>
        <Message message={publicationMessages.loading} iconName="pawPrint" />
      </S.MessageContainer>
    );
  }

  if (isError) {
    return (
      <S.MessageContainer role="alert">
        <Message message={publicationMessages.loadError} iconName="pawPrint" />
        <S.RetryButton type="button" onClick={onRetry}>
          Reintentar
        </S.RetryButton>
      </S.MessageContainer>
    );
  }

  if (fundraisings.length === 0) {
    return (
      <S.MessageContainer>
        <Message
          message={publicationMessages.emptyUrgent}
          iconName="pawPrint"
        />
      </S.MessageContainer>
    );
  }

  return (
    <S.List>
      {advice && <S.AdviceItem>{advice}</S.AdviceItem>}
      {fundraisings.map((fundraising) => (
        <FundraisingCard key={fundraising.id} fundraising={fundraising} />
      ))}
    </S.List>
  );
}

export default FundraisingList;
