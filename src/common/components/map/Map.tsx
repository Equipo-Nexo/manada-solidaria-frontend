import { MapCN, MapCNControls, MapCNMarker } from '../mapCN'
import * as S from './Map.styles'
import { useEffect, useState } from 'react'
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

function Map({
  markPoints,
  markPoint = null,
  enableMarkerOnClick = true,
  center,
  onPointSelect,
}: MapProps) {
  const { coordinates, requestCoordinates } = useGeolocation()
  const [map, setMap] = useState<MapLibreMap | null>(null)
  const [centerPoint, setCenterPoint] = useState<MapPoint | undefined>(center);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(markPoint);
  const markPointLat = markPoint?.lat
  const markPointLng = markPoint?.lng

  useEffect(() => {
    void requestCoordinates()
  }, [requestCoordinates])

  useEffect(() => {
    setSelectedPoint(
      markPointLat === undefined || markPointLng === undefined
        ? null
        : { lat: markPointLat, lng: markPointLng },
    )
  }, [markPointLat, markPointLng])

  useEffect(() => {
    if (!coordinates || centerPoint) return;

    setCenterPoint({
      lng: coordinates.longitude,
      lat: coordinates.latitude,
    });
  }, [coordinates]);

  useEffect(() => {
    if (!map || !selectedPoint) return;

    if (!map.getBounds().contains([selectedPoint.lng, selectedPoint.lat])) {
      map.easeTo({ center: selectedPoint, duration: 600 });
    }
  }, [map, selectedPoint]);

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
      setSelectedPoint(newPoint)
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
        zoom={16}
        doubleClickZoom={!enableMarkerOnClick}
        onMapReady={setMap}
      >
        <MapCNControls showLocate />
        {markPoints?.map(({ lng, lat }, index) => (
          <MapCNMarker key={`${lng}-${lat}-${index}`} longitude={lng} latitude={lat} />
        ))}
        {selectedPoint && (
          <MapCNMarker longitude={selectedPoint.lng} latitude={selectedPoint.lat} />
        )}
      </MapCN>
    </S.MapFrame>
  )
}

export default Map
