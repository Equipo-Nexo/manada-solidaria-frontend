
export interface DescriptionLine {
    iconName: string;
    text: string;
}

export interface MapItem {
    id: string;
    imageUrl: string;
    name: string;
    status: string;
    firstLineDescription: DescriptionLine;
    longitude: number;
    latitude: number;
    location: string;
}

export interface MapResponse {
    lostAnimals: MapItem[];
    inStreetAnimals: MapItem[];
    vets: MapItem[];
}