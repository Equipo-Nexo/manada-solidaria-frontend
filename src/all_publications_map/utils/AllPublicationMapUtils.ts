export const MapFilters = [
    { id: 'all', label: 'Todos' },
    { id: 'lostAnimals', label: 'Perdidos' },
    { id: 'inStreetAnimals', label: 'En la calle' },
    { id: 'vets', label: 'Veterinarias' }
] as const;

export type MapFilter = (typeof MapFilters)[number]['id'];
