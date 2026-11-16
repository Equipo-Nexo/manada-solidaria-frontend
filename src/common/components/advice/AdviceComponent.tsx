import { Info } from "../../icons";
import * as S from "./AdviceComponent.styles";

interface AdviceComponentProps {
  title?: string;
  advice: string;
}

function AdviceComponent({ title = "Consejo", advice }: AdviceComponentProps) {
  return (
    <S.Container>
      <S.IconContainer>
        <S.Icon>
          <Info aria-hidden="true" />
        </S.Icon>
      </S.IconContainer>
      <S.TextContainer>
        <S.Title>{title}</S.Title>
        <S.Description>{advice}</S.Description>
      </S.TextContainer>
    </S.Container>
  );
}

export default AdviceComponent;
