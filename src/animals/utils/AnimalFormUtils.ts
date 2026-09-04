import type {
  AnimalColor,
  AnimalPostFilter,
  AnimalPostStatus,
  AnimalPostType,
  AnimalSize,
  AnimalType,
} from "../app/types/AnimalPost.types";
import perroImage from "@images/Perro.png";
import gatoImage from "@images/Gato.png";
import otroImage from "@images/Otro.png";

export const colors: Array<{ value: AnimalColor; label: string; hex: string }> =
  [
    { value: "GRAY", label: "Gris", hex: "#8C8C8C" },
    { value: "BLACK", label: "Negro", hex: "#1A1A1A" },
    { value: "BLONDE", label: "Rubio", hex: "#E9C98D" },
    { value: "BROWN", label: "Marrón", hex: "#A0522D" },
    { value: "WHITE", label: "Blanco", hex: "#FFFFFF" },
    { value: "OTHER", label: "Otro", hex: "#FFFFFF" },
  ];

const animalSizeDescription = (animalType?: AnimalType) => {
  if (!animalType)
    return {
      SMALL: "",
      MEDIUM: "",
      LARGE: "",
    };

  return {
    DOG: {
      SMALL: "Menos de 10 kg",
      MEDIUM: "Entre 10 y 25 kg",
      LARGE: "Más de 25 kg",
    },
    CAT: {
      SMALL: "Menos de 3 kg",
      MEDIUM: "Entre 3 y 5 kg",
      LARGE: "Más de 5 kg",
    },
    OTHER: {
      SMALL: "",
      MEDIUM: "",
      LARGE: "",
    },
  }[animalType];
};

export const animalSize = (
  animalType?: AnimalType,
): Array<{
  value: AnimalSize;
  title: string;
  description: string;
}> => [
  {
    value: "SMALL",
    title: "Pequeño",
    description: animalSizeDescription(animalType).SMALL,
  },
  {
    value: "MEDIUM",
    title: "Mediano",
    description: animalSizeDescription(animalType).MEDIUM,
  },
  {
    value: "LARGE",
    title: "Grande",
    description: animalSizeDescription(animalType).LARGE,
  },
];

export interface AnimalSelectorOption {
  value: AnimalType;
  label: string;
  imageSrc: string;
}
export const animalKinds: ReadonlyArray<AnimalSelectorOption> = [
  { value: "DOG", label: "Perro", imageSrc: perroImage },
  { value: "CAT", label: "Gato", imageSrc: gatoImage },
  { value: "OTHER", label: "Otro", imageSrc: otroImage },
];

export const ANIMAL_POST_FILTER_LABELS: Record<AnimalPostFilter, string> = {
  "": "Todos",
  ["ADOPTION"]: "En adopcion",
  ["LOST"]: `Perdidos`,
  ["IN_STREET"]: "En la calle",
};

const animalPostTypeToFilterMap: Record<
  AnimalPostFilter,
  AnimalPostFilter | undefined
> = {
  ADOPTION: "ADOPTION",
  LOST: "LOST",
  IN_STREET: "IN_STREET",
  "": undefined,
};

export const animalPostTypeToFilter = (
  filter: AnimalPostFilter,
): AnimalPostFilter | undefined => {
  return animalPostTypeToFilterMap[filter];
};

export const ANIMAL_POST_STATUS_LABELS: Record<
  AnimalPostStatus | AnimalPostType,
  string | undefined
> = {
  ADOPTION: "En adopción",
  LOST: "Perdido",
  IN_STREET: "En la calle",
  CREATED: undefined,
  SEARCHING: "Perdido",
  FOUND: "Encontrado",
  SEARCHING_ADOPT_AND_TRANSIT: "En adopción",
  SEARCHING_ADOPT: "En tránsito",
  ADOPTED: "Adoptado",
  RESCUED: "Rescatado",
} as const;
