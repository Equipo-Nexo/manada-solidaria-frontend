import Arrow from "@/common/icons/Arrow";
import * as S from "./Vets.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetVetsQuery } from "../app/api/vetsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import VetCard from "../components/vet_card/VetCard";
import { useEffect, useRef } from "react";
export default function Vets() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedVetRef = useRef<HTMLDivElement>(null);

  const { id: selectedVetId } = (location.state as { id?: string } | null) ?? {};
  
  const { data: vets, isLoading, isError, refetch } = useGetVetsQuery();



  useEffect(() => {
    if (!selectedVetId || isError) return;

    selectedVetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [vets, selectedVetId, isError]);

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
          {vets?.map((vet) => (
            <S.VetContainer
              key={vet.id}
              ref={vet.id === selectedVetId ? selectedVetRef : undefined}
              $selected={vet.id === selectedVetId}
            >
              <VetCard vet={vet} />
            </S.VetContainer>
          ))}
        </S.VetsList>
      )}
    </S.Container>
  );
}
