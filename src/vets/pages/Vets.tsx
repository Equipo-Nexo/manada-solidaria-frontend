import Arrow from "@/common/icons/Arrow";
import * as S from "./Vets.styles";
import { useNavigate } from "react-router-dom";
import { useGetVetsQuery } from "@/vets/app/api/vetsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import VetCard from "@/vets/components/vet_card/VetCard";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/common/hooks/geolocation/useGeolocation";
import StatusFilter, {
  type VetStatusFilter,
} from "@/vets/components/status_filter/StatusFilter";
import { Search, Sort } from "@/common/icons";
import { useDebounce } from "@/common/hooks/debounce/useDebounce";
export default function Vets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [statusFilter, setStatusFilter] = useState<VetStatusFilter>("ALL");

  const { coordinates, requestCoordinates, status } = useGeolocation();
  useEffect(() => {
    if (status === "idle") {
      void requestCoordinates();
    }
  }, [status, requestCoordinates]);

  const {
    data: vets,
    isLoading,
    isError,
    refetch,
  } = useGetVetsQuery({
    query: debouncedSearch || undefined,
    userLatitude: coordinates?.latitude,
    userLongitude: coordinates?.longitude,
  });

  const handleSortByDistance = async () => {
    if (coordinates) {
      return;
    }
    await requestCoordinates();
  };
  const filteredVets = vets?.filter((vet) => {
    if (statusFilter === "OPEN") {
      return vet.isOpen;
    }
    if (statusFilter === "CLOSED") {
      return !vet.isOpen;
    }
    return true;
  });
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
      {isError ? (
        <S.MessageContainer role="alert">
          <Message
            message="No se pudieron cargar las veterinarias."
            iconName="pawPrint"
          />

          <S.RetryButton type="button" onClick={() => void refetch()}>
            Reintentar
          </S.RetryButton>
        </S.MessageContainer>
      ) : (
        <>
          <S.FiltersContainer>
            <S.SearchWrapper>
              <Search aria-hidden="true" />

              <S.SearchInput
                type="search"
                placeholder="Buscá por nombre o dirección"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </S.SearchWrapper>

            <S.FiltersRow>
              <StatusFilter value={statusFilter} onChange={setStatusFilter} />

              <S.DistanceButton
                type="button"
                $active={Boolean(coordinates)}
                onClick={() => void handleSortByDistance()}
              >
                <Sort aria-hidden="true" />
                Más cercanas
              </S.DistanceButton>
            </S.FiltersRow>
          </S.FiltersContainer>

          <S.VetsList>
            {filteredVets?.map((vet) => (
              <VetCard key={vet.id} vet={vet} />
            ))}
          </S.VetsList>
        </>
      )}
    </S.Container>
  );
}
