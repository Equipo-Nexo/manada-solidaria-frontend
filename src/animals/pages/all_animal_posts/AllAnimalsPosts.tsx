import { useState } from "react";
import { CategorySelector } from "@components/index.ts";
import { FilterIcon } from "@icons/index.ts";
import * as S from "./allAnimalPosts.styles";
import { animalPostFilters, type AnimalPostFilter } from "@animals/app/types/AnimalPost.types";
import { useGetAnimalPostsQuery } from "@animals/app/api/animalPostsApi";
import { ANIMAL_POST_FILTER_LABELS, animalPostTypeToFilter } from "@/animals/utils/AnimalFormUtils";
import type { AnimalFilters as AnimalFiltersType } from "@animals/app/api/requests/animalPostRequests";
import AnimalFilters from "@/animals/components/animal_filters/AnimalFilters";
import Layout from "@/common/components/layout/Layout";
import AnimalPostList from "@/animals/components/animal_post_list/AnimalPostList";
const PAGE_SIZE = 10;

function AllAnimalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<AnimalPostFilter>("");
  const [appliedFilters, setAppliedFilters] = useState<AnimalFiltersType>({});
  const hasAppliedFilters = Object.values(appliedFilters).some((value) => value !== undefined);

  const [draftFilters, setDraftFilters] = useState<AnimalFiltersType>({});

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleOpenFilters = () => {
    setDraftFilters({ ...appliedFilters });
    setIsFiltersOpen(true);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFiltersOpen(false);
  };
  const handleClearFilters = () => {
    setDraftFilters({});
    setAppliedFilters({});
    setIsFiltersOpen(false);
  };
  const {
    data: animalPosts,
    isError,
    isLoading,
  } = useGetAnimalPostsQuery({
    type: animalPostTypeToFilter(selectedCategory),
    ...appliedFilters,
    page: 0,
    size: PAGE_SIZE,
  });
  const posts = animalPosts?.content ?? [];
  const totalElements = animalPosts?.totalElements ?? 0;

  return (
    <Layout
      title="Animales publicados"
      subtitle={
        isLoading
          ? "Cargando resultados..."
          : `${totalElements} ${totalElements === 1 ? "resultado" : "resultados"}`
      }
      isLoading={isLoading}
      isError={isError}
      headerAction={
        <S.FilterButton
          type="button"
          $hasAppliedFilters={hasAppliedFilters}
          onClick={handleOpenFilters}
          aria-label={
            hasAppliedFilters
              ? "Abrir filtros de animales, hay filtros aplicados"
              : "Abrir filtros de animales"
          }
        >
          <S.FilterButtonLabel>Filtros</S.FilterButtonLabel>
          <FilterIcon width={20} height={20} aria-hidden="true" />
        </S.FilterButton>
      }
    >
      <S.FiltersContainer>
        <CategorySelector
          categories={animalPostFilters}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          getCategoryLabel={(category) => ANIMAL_POST_FILTER_LABELS[category]}
          ariaLabel="Filtrar publicaciones por categoría"
        />
      </S.FiltersContainer>

      <AnimalPostList posts={posts} />

      <AnimalFilters
        isOpen={isFiltersOpen}
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        onClose={() => setIsFiltersOpen(false)}
        onClear={handleClearFilters}
      />
    </Layout>
  );
}

export default AllAnimalsPage;
