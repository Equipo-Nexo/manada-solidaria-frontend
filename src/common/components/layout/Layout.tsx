import { useNavigate } from "react-router-dom";
import * as S from "./Layout.styles";
import { Arrow } from "@/common/icons";
import PawLoader from "../pawLoader/PawLoader";
import Message from "../message/message";

interface LayoutProps { 
  children: React.ReactNode;
  title: string;
  backTo?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  isError?: boolean;
  errorMessage?: string;
}

export default function Layout({ 
  children, 
  title, 
  backTo,
  isLoading = false,
  loadingMessage = "Cargando...",
  isError = false,
  errorMessage = "Ocurrió un error al cargar la página." 
}: LayoutProps) {
  const navigate = useNavigate();

  const LoadingContent = () => (
    <S.LoaderContainer>
      <PawLoader label={loadingMessage} />
    </S.LoaderContainer>
  );

  const ErrorContent = () => (
    <S.StateContainer role="alert">
      <Message message={errorMessage} iconName="pawPrint" />
    </S.StateContainer>
  );


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
          { isLoading && <LoadingContent /> }
          { isError && <ErrorContent /> }
          { !isLoading && !isError && children }
      </S.LayoutContent>
    </S.LayoutContainer>
  )
}