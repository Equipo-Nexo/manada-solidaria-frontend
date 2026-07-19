export type CampaignResponse = {
  id: string;
  type: string;
  title: string;
  description: string;
  imageId: string;
  location: {
    id: string;
    name: string;
    address: string;
    number: number;
    latitude: number;
    longitude: number;
  };
};

export type CampaignPageResponse = {
  content: CampaignResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
};
