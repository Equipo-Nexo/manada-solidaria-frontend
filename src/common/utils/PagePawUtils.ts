export type PagePawPosition = {
  left: number;
  top: number;
  size: number;
  rotation: number;
  opacity: number;
};

const COLUMNS = 4;
const ROWS = 5;

export const createPagePaws = (navigationKey: string): PagePawPosition[] => {
  const seed = [...navigationKey].reduce(
    (value, character) => value * 31 + character.charCodeAt(0),
    17,
  );
  const valueAt = (index: number) => {
    const value = Math.sin(seed + index * 9283.17) * 43758.5453;
    return value - Math.floor(value);
  };

  return Array.from({ length: COLUMNS * ROWS }, (_, index) => {
    const column = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);

    return {
      left: ((column + 0.25 + valueAt(index * 5) * 0.5) / COLUMNS) * 100,
      top: ((row + 0.25 + valueAt(index * 5 + 1) * 0.5) / ROWS) * 100,
      size: 22 + valueAt(index * 5 + 2) * 20,
      rotation: -45 + valueAt(index * 5 + 3) * 90,
      opacity: 0.05 + valueAt(index * 5 + 4) * 0.045,
    };
  });
};
