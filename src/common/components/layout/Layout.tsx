import { useNavigate } from "react-router-dom";
import * as S from "./Layout.styles";
import { Arrow } from "@/common/icons";

interface LayoutProps { 
    children: React.ReactNode;
    title: string;
    backTo?: string;
}

export default function Layout({ children, title, backTo }: LayoutProps) {
  const navigate = useNavigate();

  return (
    <S.LayoutContainer>
      <S.Header>
        <S.BackButton 
          type="button" 
          onClick={() => navigate(backTo || '/home')} 
          aria-label="Volver"
        >
          <Arrow aria-hidden="true" />
        </S.BackButton>
        <S.PageTitle>{title}</S.PageTitle>
      </S.Header>
      <S.LayoutContent>
          {children}
      </S.LayoutContent>
    </S.LayoutContainer>
  )
}