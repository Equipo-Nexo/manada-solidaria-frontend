import { createContext, useContext } from 'react'
import type { Map as MapLibreMap } from 'maplibre-gl'

export type MapContextValue = {
  map: MapLibreMap | null
  isLoaded: boolean
}

export const MapContext = createContext<MapContextValue | null>(null)

export function useMapCN() {
  const context = useContext(MapContext)

  if (!context) {
    throw new Error('useMapCN debe utilizarse dentro de un componente MapCN')
  }

  return context
}
