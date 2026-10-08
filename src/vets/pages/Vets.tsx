import Arrow from "@/common/icons/Arrow";
import * as S from "./Vets.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetVetsQuery } from "../app/api/vetsApi";
import PawLoader from "@/common/components/pawLoader/PawLoader";
import { Message } from "@/common/components";
import { useEffect, useState, useRef } from "react";
import { useGeolocation } from "@/common/hooks/geolocation/useGeolocation";
import StatusFilter, {
  type VetStatusFilter,
} from "@/vets/components/status_filter/StatusFilter";
import { Search, Sort } from "@/common/icons";
import { useDebounce } from "@/common/hooks/debounce/useDebounce";
import VetCard from "../components/vet_card/VetCard";

export default function Vets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [statusFilter, setStatusFilter] = useState<VetStatusFilter>("ALL");
  const { coordinates, requestCoordinates } = useGeolocation();
  const [locationChecked, setLocationChecked] = useState(false);
  const location = useLocation();
  const selectedVetRef = useRef<HTMLDivElement>(null);

  const { id: selectedVetId } = (location.state as { id?: string } | null) ?? {};

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        if (permission.state === "granted") {
          await requestCoordinates();
        }
      } finally {
        setLocationChecked(true);
      }
    };
    void checkLocationPermission();
  }, [requestCoordinates]);
  

  const {
    data: vets,
    isLoading,
    isError,
    refetch,
  } = useGetVetsQuery(
    {
      query: debouncedSearch || undefined,
      userLatitude: coordinates?.latitude,
      userLongitude: coordinates?.longitude,
    },
    {
      skip: !locationChecked,
    },
  );

  
  useEffect(() => {
    if (!selectedVetId || isError) return;

    selectedVetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [vets, selectedVetId, isError]);


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
  if (!locationChecked || isLoading) {
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
              <S.VetContainer
                key={vet.id}
                ref={vet.id === selectedVetId ? selectedVetRef : undefined}
                $selected={vet.id === selectedVetId}
              >
                <VetCard vet={vet} />
              </S.VetContainer>     
            ))}
          </S.VetsList>
        </>
      )}
    </S.Container>
  );
}
