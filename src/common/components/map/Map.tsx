import { MapCN, MapCNControls, MapCNMarker } from '../mapCN'
import * as S from './Map.styles'
import { useEffect, useMemo, useState } from 'react'
import type { Map as MapLibreMap, MapMouseEvent } from 'maplibre-gl'
import { useGeolocation } from '@hooks/geolocation/useGeolocation'

export type MapPoint = { lng: number; lat: number }

interface MapProps {
  markPoints?: MapPoint[]
  markPoint?: MapPoint | null;
  enableMarkerOnClick?: boolean
  center?: MapPoint;
  onPointSelect?: (point: MapPoint) => void
}

const ARG_CENTER_POINT = {
  "lng": -65.45210548341893,
  "lat": -36.26607671726336
}
const ARG_DEFAULT_ZOOM = 3.1976036153806247

function Map({
  markPoints,
  markPoint = null,
  enableMarkerOnClick = true,
  center,
  onPointSelect,
}: MapProps) {
  const { coordinates, requestCoordinates, status } = useGeolocation()
  const [map, setMap] = useState<MapLibreMap | null>(null)
  const markPointLat = markPoint?.lat
  const markPointLng = markPoint?.lng
  const centerLat = center?.lat
  const centerLng = center?.lng

  const { centerPoint, zoom } = useMemo(() => {
    if (status === 'denied') {
      return { centerPoint: ARG_CENTER_POINT, zoom: ARG_DEFAULT_ZOOM }
    }

    if (status === 'granted' && coordinates) {
      return {
        centerPoint: {
          lng: coordinates.longitude,
          lat: coordinates.latitude,
        },
        zoom: 16,
      }
    }

    return {
      centerPoint:
        centerLat === undefined || centerLng === undefined
          ? undefined
          : { lat: centerLat, lng: centerLng },
      zoom: 100,
    }
  }, [centerLat, centerLng, coordinates, status])

  useEffect(() => {
    void requestCoordinates()
  }, [requestCoordinates])

  useEffect(() => {
    if (!map || markPointLat === undefined || markPointLng === undefined) return;

    if (!map.getBounds().contains([markPointLng, markPointLat])) {
      map.easeTo({ center: { lng: markPointLng, lat: markPointLat }, duration: 600 });
    }
  }, [map, markPointLat, markPointLng]);

  useEffect(() => {
    if (!map) return

    if (enableMarkerOnClick) {
      map.doubleClickZoom.disable()
    } else {
      map.doubleClickZoom.enable()
    }
  }, [enableMarkerOnClick, map])

  useEffect(() => {
    if (!map || !enableMarkerOnClick) return

    const selectPoint = (event: MapMouseEvent) => {
      const newPoint = { lng: event.lngLat.lng, lat: event.lngLat.lat }
      onPointSelect?.(newPoint)
    }
    const handleDoubleClick = (event: MapMouseEvent) => selectPoint(event)
    const handleTap = (event: MapMouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) selectPoint(event)
    }

    map.on('dblclick', handleDoubleClick)
    map.on('click', handleTap)
    return () => {
      map.off('dblclick', handleDoubleClick)
      map.off('click', handleTap)
    }
  }, [enableMarkerOnClick, map, onPointSelect])

  return (
    <S.MapFrame>
      <MapCN
        center={centerPoint}
        zoom={zoom}
        doubleClickZoom={!enableMarkerOnClick}
        onMapReady={setMap}
      >
        <MapCNControls showLocate />
        {markPoints?.map(({ lng, lat }, index) => (
          <MapCNMarker key={`${lng}-${lat}-${index}`} longitude={lng} latitude={lat} />
        ))}
        {markPoint && (
          <MapCNMarker longitude={markPoint.lng} latitude={markPoint.lat} />
        )}
      </MapCN>
    </S.MapFrame>
  )
}

export default Map
