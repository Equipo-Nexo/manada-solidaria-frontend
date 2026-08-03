import { Info } from "../icons";
import * as S from "./AdviceComponent.styles";

interface AdviceComponentProps {
  title?: string;
  advice: string;
}

function AdviceComponent({ title = "Consejo", advice }: AdviceComponentProps) {
  return (
    <S.Container>
      <S.Icon>
        <Info aria-hidden="true" />
      </S.Icon>
      <div>
        <S.Title>{title}</S.Title>
        <S.Description>{advice}</S.Description>
      </div>
    </S.Container>
  );
}

export default AdviceComponent;
