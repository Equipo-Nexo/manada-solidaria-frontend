import { MapCN, MapCNControls, MapCNMarker } from '../mapCN'
import * as S from './Map.styles'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as MapLibreMap, MapMouseEvent } from 'maplibre-gl'
import { useGeolocation } from '@hooks/geolocation/useGeolocation'

const DEFAULT_POINT = { lng: -58.3816, lat: -34.6037 }

export type MapPoint = { lng: number; lat: number }

interface MapProps {
  markPoints?: MapPoint[]
  markPoint?: MapPoint | null;
  enableMarkerOnClick?: boolean
  onPointSelect?: (point: MapPoint) => void
}

function Map({
  markPoints,
  markPoint = null,
  enableMarkerOnClick = true,
  onPointSelect,
}: MapProps) {
  const { coordinates, requestCoordinates } = useGeolocation()
  const frameRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<MapLibreMap | null>(null)
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(markPoint)

  useEffect(() => {
    void requestCoordinates()
  }, [requestCoordinates])

  useEffect(() => {
    setSelectedPoint(markPoint)
  }, [markPoint])

  const point = useMemo(
    () =>
      coordinates
        ? { lng: coordinates.longitude, lat: coordinates.latitude }
        : DEFAULT_POINT,
    [coordinates],
  )

  useEffect(() => {
    const frame = frameRef.current
    if (!frame || !map) return

    let animationFrame: number | null = null
    const recenterMap = () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        map.resize()
        map.jumpTo({ center: point })
      })
    }
    const resizeObserver = new ResizeObserver(recenterMap)

    resizeObserver.observe(frame)
    recenterMap()

    return () => {
      resizeObserver.disconnect()
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
    }
  }, [map, point])

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
    <S.MapFrame ref={frameRef}>
      <MapCN
        center={point}
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
