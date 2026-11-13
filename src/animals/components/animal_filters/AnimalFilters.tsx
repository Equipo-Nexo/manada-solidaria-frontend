import type { ReactNode } from "react";
import {
  Check,
  Calendar,
  ColorPalet,
  Gender,
  PawPrint,
  Ruler,
} from "@common/icons";
import {
  animalTypes,
  animalTypeLabels,
  animalAges,
  animalAgeLabels,
  animalSexes,
  animalSexLabels,
  animalSizes,
  animalSizeLabels,
  animalColors,
  animalColorLabels,
} from "@/animals/app/types/AnimalPost.types";
import type { AnimalFilters as AnimalFiltersType } from "@animals/app/api/requests/animalPostRequests";
import * as S from "./AnimalFilters.styles";
const filterableAnimalSexes = animalSexes.filter((sex) => sex !== "UNKNOWN");
type AnimalFiltersProps = {
  isOpen: boolean;
  filters: AnimalFiltersType;
  onChange: (filters: AnimalFiltersType) => void;
  onApply: () => void;
  onClose: () => void;
  onClear: () => void;
};

function AnimalFilters({
  isOpen,
  filters,
  onChange,
  onApply,
  onClose,
  onClear,
}: AnimalFiltersProps) {
  const toggleFilter = <K extends keyof AnimalFiltersType>(
    key: K,
    value: AnimalFiltersType[K],
  ) => {
    onChange({
      ...filters,
      [key]: filters[key] === value ? undefined : value,
    });
  };

  const renderOptions = <K extends keyof AnimalFiltersType>(
    key: K,
    options: readonly NonNullable<AnimalFiltersType[K]>[],
    labels: Record<string, string>,
  ): ReactNode =>
    options.map((option) => (
      <S.FilterOption
        key={String(option)}
        type="button"
        $selected={filters[key] === option}
        aria-pressed={filters[key] === option}
        onClick={() => toggleFilter(key, option)}
      >
        <S.SelectionMark aria-hidden="true">
          <Check />
        </S.SelectionMark>
        {labels[String(option)]}
      </S.FilterOption>
    ));

  return (
    <S.Sheet isOpen={isOpen} onClose={onClose} ariaLabel="Filtros de animales">
      <S.Container>
        <S.Title>Más filtros</S.Title>

        <S.FiltersContent>
          <S.FilterGroup>
            <S.GroupTitle>
              <S.GroupIcon>
                <PawPrint aria-hidden="true" />
              </S.GroupIcon>
              Especie
            </S.GroupTitle>
            <S.OptionsContainer>
              {renderOptions("animalType", animalTypes, animalTypeLabels)}
            </S.OptionsContainer>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.GroupTitle>
              <S.GroupIcon>
                <Calendar aria-hidden="true" />
              </S.GroupIcon>
              Edad
            </S.GroupTitle>
            <S.OptionsContainer>
              {renderOptions("animalAge", animalAges, animalAgeLabels)}
            </S.OptionsContainer>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.GroupTitle>
              <S.GroupIcon aria-hidden="true">
                <Gender />
              </S.GroupIcon>
              Sexo
            </S.GroupTitle>
            <S.OptionsContainer>
              {renderOptions(
                "animalGender",
                filterableAnimalSexes,
                animalSexLabels,
              )}
            </S.OptionsContainer>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.GroupTitle>
              <S.GroupIcon>
                <Ruler aria-hidden="true" />
              </S.GroupIcon>
              Tamaño
            </S.GroupTitle>
            <S.OptionsContainer>
              {renderOptions("animalSize", animalSizes, animalSizeLabels)}
            </S.OptionsContainer>
          </S.FilterGroup>

          <S.FilterGroup>
            <S.GroupTitle>
              <S.GroupIcon>
                <ColorPalet aria-hidden="true" />
              </S.GroupIcon>
              Color
            </S.GroupTitle>
            <S.OptionsContainer>
              {renderOptions("animalColor", animalColors, animalColorLabels)}
            </S.OptionsContainer>
          </S.FilterGroup>
        </S.FiltersContent>

        <S.Actions>
          <S.ClearButton type="button" onClick={onClear}>
            Limpiar todo
          </S.ClearButton>

          <S.ApplyButton type="button" onClick={onApply}>
            Aplicar filtros
          </S.ApplyButton>
        </S.Actions>
      </S.Container>
    </S.Sheet>
  );
}

export default AnimalFilters;
