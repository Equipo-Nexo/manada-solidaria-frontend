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
  const [centerPoint, setCenterPoint] = useState<MapPoint | undefined>(center);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(markPoint);
  const [zoom, setZoom] = useState<number>(100)
  const markPointLat = markPoint?.lat
  const markPointLng = markPoint?.lng

  console.log(status)
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
    if (status === 'denied') {
      setZoom(ARG_DEFAULT_ZOOM);
      setCenterPoint(ARG_CENTER_POINT);
    };

    if (status === 'granted' && coordinates) {
      setZoom(16)
      setCenterPoint({
        lng: coordinates.longitude,
        lat: coordinates.latitude,
      });
    };
  }, [coordinates, status]);

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
        zoom={zoom}
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
