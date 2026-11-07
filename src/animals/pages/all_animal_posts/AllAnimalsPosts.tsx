import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AnimalPostCard,
  CategorySelector,
  Message,
} from "@components/index.ts";
import { mapAnimalPostToCardProps } from "@components/animalPostCard/mapAnimalPostToCardProps";
import { ArrowLeft, FilterIcon } from "@icons/index.ts";
import * as S from "./allAnimalPosts.styles";
import { publicationMessages } from "@utils/Messages";
import {
  animalPostFilters,
  type AnimalPostFilter,
} from "@animals/app/types/AnimalPost.types";
import { useGetAnimalPostsQuery } from "@animals/app/api/animalPostsApi";
import {
  ANIMAL_POST_FILTER_LABELS,
  animalPostTypeToFilter,
} from "@/animals/utils/AnimalFormUtils";
import type { AnimalFilters as AnimalFiltersType } from "@animals/app/api/requests/animalPostRequests";
import AnimalFilters from "@/animals/components/animal_filters/AnimalFilters";
const PAGE_SIZE = 10;

function AllAnimalsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<AnimalPostFilter>("");
  const [appliedFilters, setAppliedFilters] = useState<AnimalFiltersType>({});
  const hasAppliedFilters = Object.values(appliedFilters).some(
    (value) => value !== undefined,
  );

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
    refetch,
  } = useGetAnimalPostsQuery({
    type: animalPostTypeToFilter(selectedCategory),
    ...appliedFilters,
    page: 0,
    size: PAGE_SIZE,
  });
  const posts = animalPosts?.content ?? [];
  const totalElements = animalPosts?.totalElements ?? 0;
  return (
    <S.Page>
      <S.Header>
        <S.BackButton
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Volver"
        >
          <ArrowLeft aria-hidden="true" />
        </S.BackButton>
        <S.TitlesContainer>
          <S.PageTitle>Animales publicados</S.PageTitle>
          <S.PageSubtitle>
            {isLoading
              ? "Cargando resultados..."
              : `${totalElements} ${totalElements === 1 ? "resultado" : "resultados"}`}
          </S.PageSubtitle>
        </S.TitlesContainer>
        <S.FilterButton
          type="button"
          $hasAppliedFilters={hasAppliedFilters}
          onClick={handleOpenFilters}
          aria-label={hasAppliedFilters
            ? "Abrir filtros de animales, hay filtros aplicados"
            : "Abrir filtros de animales"}
        >
          <S.FilterButtonLabel>Filtros</S.FilterButtonLabel>
          <FilterIcon width={20} height={20} aria-hidden="true" />
        </S.FilterButton>
      </S.Header>

      <S.FiltersContainer>
        <CategorySelector
          categories={animalPostFilters}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          getCategoryLabel={(category) => ANIMAL_POST_FILTER_LABELS[category]}
          ariaLabel="Filtrar publicaciones por categoría"
        />
      </S.FiltersContainer>

      <S.PublicationsContainer aria-live="polite">
        {isLoading && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.loading}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}

        {isError && (
          <S.MessageContainer role="alert">
            <Message
              message={publicationMessages.loadError}
              iconName="pawPrint"
            />
            <S.RetryButton type="button" onClick={() => void refetch()}>
              Reintentar
            </S.RetryButton>
          </S.MessageContainer>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <S.MessageContainer>
            <Message
              message={publicationMessages.emptyCategory}
              iconName="pawPrint"
            />
          </S.MessageContainer>
        )}

        {!isLoading &&
          !isError &&
          posts.map((post) => {
            return (
              <AnimalPostCard
                key={post.id}
                {...mapAnimalPostToCardProps(post)}
              />
            );
          })}
      </S.PublicationsContainer>
      <AnimalFilters
        isOpen={isFiltersOpen}
        filters={draftFilters}
        onChange={setDraftFilters}
        onApply={handleApplyFilters}
        onClose={() => setIsFiltersOpen(false)}
        onClear={handleClearFilters}
      />
    </S.Page>
  );
}

export default AllAnimalsPage;
