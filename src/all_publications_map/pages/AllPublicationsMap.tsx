import { BottomSheet, CategorySelector, Map } from "@components/index.ts";
import * as S from "./AllPublicationsMap.styles";
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { useGetMapQuery } from "../app/api/MapApi";
import type { MapClusterGroup } from "@/common/components/map/Map";
import { BriefcaseMedical, PawPrint } from "@/common/icons";
import type { MapItem } from "../app/api/responses/MapResponse";
import MapPublicationsSheetContent from "../components/publications_sheet/MapPublicationsSheetContent";
import { MapFilters, type MapFilter } from "../utils/AllPublicationMapUtils";

function AllPublicationsMap() {
  
  const theme = useTheme();
  const { data } = useGetMapQuery();
  const [selection, setSelection] = useState<{ items: MapItem[]; groupId: string } | null>(null);
  const [filter, setFilter] = useState<MapFilter>('all');
  const [searchParams] = useSearchParams();

  const point = useMemo(() => {
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");

    if (!latitude || !longitude) {
      return undefined;
    }

    return {
      lat: Number(latitude),
      lng: Number(longitude),
    };
  }, [searchParams]);

  const clusterGroups = useMemo<(MapClusterGroup<MapItem> & { label: string })[]>(() => [
    {
      id: "lostAnimals",
      label: "Perdidos",
      color: theme.colors.statusLostBackground,
      marker: {
        icon: PawPrint,
        iconColor: theme.colors.statusSearchingtext,
        borderColor: theme.colors.statusSearchingtext,
      },
      items: data?.lostAnimals ?? [],
    },
    {
      id: "inStreetAnimals",
      label: "En la calle",
      color: theme.colors.statusStreetBackground,
      marker: {
        icon: PawPrint,
        iconColor: theme.colors.statusStreetText,
        borderColor: theme.colors.statusStreetText,
      },
      items: data?.inStreetAnimals ?? [],
    },
    {
      id: "vets",
      label: "Veterinarias",
      color: theme.colors.neutral,
      marker: {
        icon: BriefcaseMedical,
        iconColor: theme.colors.brand,
        borderColor: theme.colors.brand,
      },
      items: data?.vets ?? [],
    },
  ].map(({ id, label, color, marker, items }) => ({
    id,
    label,
    color,
    marker,
    points: items.map((item) => ({ lat: item.latitude, lng: item.longitude, data: item })),
  })), [data, theme]);

  const selectedGroup = clusterGroups.find((group) => group.id === selection?.groupId);
  const closeSheet = useCallback(() => setSelection(null), []);

  const handleClusterClick = (items: MapItem[], groupId: string) => {
    if (items.length > 0) setSelection({ items, groupId });
  };

  const handleMarkerClick = (item: MapItem, groupId: string) => {
    setSelection({ items: [item], groupId });
  };

  return (
    <S.Page>
      <S.Header>
        <h1>Mapa</h1>
      </S.Header>
      <S.FiltersContainer>
        <CategorySelector 
          categories={MapFilters.map(({ id }) => id)}
          selectedCategory={filter ?? ''}
          onCategoryChange={(category) => setFilter(category)}
          getCategoryLabel={(category) => MapFilters.find((filter) => filter.id === category)?.label ?? category}
          ariaLabel="Filtrar publicaciones por categoría"
        />
      </S.FiltersContainer>
      <S.MapFrame>
        <Map
          clusterGroups={filter !== 'all' ? clusterGroups.filter((group) => group.id === filter) : clusterGroups}
          legends={clusterGroups.map((group) => ({ id: group.id, label: group.label, icon: group.marker?.icon, iconColor: group.marker?.iconColor }))}
          enableMarkerOnClick={false}
          center={point}
          onClusterClick={handleClusterClick}
          onMarkerClick={handleMarkerClick}
        />
      </S.MapFrame>
      {selection && selectedGroup && (
        <BottomSheet isOpen onClose={closeSheet} ariaLabel={selectedGroup.label}>
          <MapPublicationsSheetContent
            items={selection.items}
            groupId={selectedGroup.id}
            title={selectedGroup.label}
            color={selectedGroup.color}
            iconColor={selectedGroup.marker?.iconColor ?? theme.colors.darkColor}
            onClose={closeSheet}
          />
        </BottomSheet>
      )}
    </S.Page>
  );
}

export default AllPublicationsMap;
