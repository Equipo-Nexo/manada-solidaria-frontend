export interface GeolocationRequest {
    text: string
    longitude?: number
    latitude?: number
}

export interface GeolocationReverseRequest { 
    latitude: number
    longitude: number
}