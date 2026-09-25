import Arrow from "@/common/icons/Arrow";
import * as S from "./Vets.styles";
import { useNavigate } from "react-router-dom";
import { useGetVetsQuery } from "../app/api/vetsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import VetCard from "../components/vet_card/VetCard";
import { useState } from "react";
import { useGeolocation } from "@/common/hooks/geolocation/useGeolocation";
import StatusFilter, {
  type VetStatusFilter,
} from "../components/status_filter/StatusFilter";
import { FilterIcon, Search } from "@/common/icons";
export default function Vets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortByDistance, setSortByDistance] = useState(false);
  const { coordinates, requestCoordinates } = useGeolocation();
  const [statusFilter, setStatusFilter] = useState<VetStatusFilter>("ALL");
  const openOnly = statusFilter === "OPEN";
  const {
    data: vets,
    isLoading,
    isError,
    refetch,
  } = useGetVetsQuery({
    query: search || undefined,
    openOnly,
    userLatitude:
      sortByDistance && coordinates ? coordinates.latitude : undefined,
    userLongitude:
      sortByDistance && coordinates ? coordinates.longitude : undefined,
  });

  const handleSortByDistance = async () => {
    if (sortByDistance) {
      setSortByDistance(false);
      return;
    }
    if (!coordinates) {
      await requestCoordinates();
    }
    setSortByDistance(true);
  };
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
                $active={sortByDistance}
                onClick={() => void handleSortByDistance()}
              >
                <FilterIcon aria-hidden="true" />
                Más cercanas
              </S.DistanceButton>
            </S.FiltersRow>
          </S.FiltersContainer>

          <S.VetsList>
            {vets?.map((vet) => (
              <VetCard key={vet.id} vet={vet} />
            ))}
          </S.VetsList>
        </>
      )}
    </S.Container>
  );
}
