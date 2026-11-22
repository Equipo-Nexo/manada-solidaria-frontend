import { useNavigate } from "react-router-dom";
import * as S from "./Layout.styles";
import { Arrow } from "@/common/icons";
import PawLoader from "../pawLoader/PawLoader";
import Message from "../message/message";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  backTo?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  isError?: boolean;
  errorMessage?: string;
  headerAction?: React.ReactNode;
}

export default function Layout({
  children,
  title,
  backTo,
  subtitle,
  headerAction,
  isLoading = false,
  loadingMessage = "Cargando...",
  isError = false,
  errorMessage = "Ocurrió un error al cargar la página.",
}: LayoutProps) {
  const navigate = useNavigate();

  return (
    <S.LayoutContainer>
      <S.Header>
        <S.ButtonAndTitleContainer>
          <S.BackButton
            type="button"
            onClick={() => navigate(backTo || "/home")}
            aria-label="Volver"
          >
            <Arrow aria-hidden="true" />
          </S.BackButton>
          <S.TitleContainer>
            <S.PageTitle>{title}</S.PageTitle>
            {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
          </S.TitleContainer>
        </S.ButtonAndTitleContainer>
        {headerAction}
      </S.Header>
      <S.LayoutContent>
        {isLoading && (
          <S.LoaderContainer>
            <PawLoader label={loadingMessage} />
          </S.LoaderContainer>
        )}
        {!isLoading && isError && (
          <S.StateContainer role="alert">
            <Message message={errorMessage} iconName="pawPrint" />
          </S.StateContainer>
        )}
        {!isLoading && !isError && children}
      </S.LayoutContent>
    </S.LayoutContainer>
  );
}
