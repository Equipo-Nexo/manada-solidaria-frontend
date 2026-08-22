export interface GeolocationResponse {
  country: string;
  state: string;
  city: string;
  municipality: string;
  district: string;
  street: string;
  housenumber: string;
  lon: number;
  lat: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
}

export interface Location {
  name: string;
  address: string;
  number: number;
  latitude: number;
  longitude: number;
}