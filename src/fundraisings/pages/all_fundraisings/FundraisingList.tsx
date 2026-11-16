import type { FundraisingCardData } from "@components/fundraisingCard/FundraisingCard";
import { Advice, FundraisingCard, Message } from "@components/index.ts";
import * as S from "@campaigns/components/campaign_list/CampaignList.styles";
import { publicationMessages } from "@utils/Messages";
import { useNavigate } from "react-router-dom";

type FundraisingListProps = {
  fundraisings: FundraisingCardData[];
};

function FundraisingList({
  fundraisings,
}: FundraisingListProps) {
  const navigate = useNavigate();

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
      <Advice
        title="Información importante"
        advice="El progreso de la colecta no se actualiza en tiempo real. Se refleja cuando la rescatista verifica las transferencias."
      />      
      {fundraisings.map((fundraising) => (
        <FundraisingCard
          key={fundraising.id}
          fundraising={fundraising}
          onViewStory={(fundraising) => {
            navigate(`/colectas/${fundraising.id}`);
          }}
        />
      ))}
    </S.List>
  );
}

export default FundraisingList;
