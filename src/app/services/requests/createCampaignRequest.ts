export interface CreateCampaignRequest {
  type: string;
  title: string;
  description: string;
  imageId?: string;

  location: {
    name: string;
    address: string;
    number: number;
    latitude: number;
    longitude: number;
  };
}
