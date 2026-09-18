import Arrow from "@/common/icons/Arrow";
import * as S from "./Vets.styles";
import { useNavigate } from "react-router-dom";
import { useGetVetsQuery } from "../app/api/vetsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import VetCard from "../components/vet_card/VetCard";
export default function Vets() {
  const navigate = useNavigate();
  const { data: vets, isLoading, isError, refetch } = useGetVetsQuery();
  if (isLoading) {
    return <PawLoader label="Cargando veterinarias..." />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate("/home")}>
          <Arrow aria-hidden="true" />
        </S.BackButton>

        <S.Title>Veterinarias</S.Title>
      </S.Header>
      {isError && (
        <S.MessageContainer role="alert">
          <Message
            message="No se pudieron cargar las veterinarias."
            iconName="pawPrint"
          />
          <S.RetryButton type="button" onClick={() => void refetch()}>
            Reintentar
          </S.RetryButton>
        </S.MessageContainer>
      )}
      {!isError && (
        <S.VetsList>
          {vets?.map((vet) => {
            return <VetCard key={vet.id} vet={vet} />;
          })}
        </S.VetsList>
      )}
    </S.Container>
  );
}
