import { useEffect, useEffectEvent, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import type { FeatureCollection, Point } from 'geojson'
import type { GeoJSONSource, MapLayerMouseEvent } from 'maplibre-gl'
import { useMapCN } from './mapCNContext'
import { MapCNMarker, type MapCNMarkerProps } from './MapCN'

export type MapCNClusterProps<TItem = unknown> = {
  id: string
  color: string
  points: { lng: number; lat: number; data: TItem }[]
  marker?: Pick<MapCNMarkerProps, 'icon' | 'color' | 'iconColor' | 'borderColor'>
  onClusterClick?: (items: TItem[], groupId: string) => void
  onMarkerClick?: (item: TItem, groupId: string) => void
}

type UnclusteredPoint<TItem> = { id: number; lng: number; lat: number; data: TItem }

export function MapCNCluster<TItem>({
  id, color, points, marker, onClusterClick, onMarkerClick,
}: MapCNClusterProps<TItem>) {
  const { map, isLoaded } = useMapCN()
  const [unclusteredPoints, setUnclusteredPoints] = useState<UnclusteredPoint<TItem>[]>([])
  const theme = useTheme()
  const sourceId = `cluster-group-${id}`
  const strokeColor = marker?.borderColor ?? theme.colors.background
  const textColor = marker?.iconColor ?? theme.colors.black
  const textSize = Number.parseFloat(theme.typography.body.fontSize)

  const validPoints = useMemo(() => points.filter(({ lng, lat }) =>
    Number.isFinite(lng) && Number.isFinite(lat)
    && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90,
  ), [points])
  const notifyClusterClick = useEffectEvent((items: TItem[]) => onClusterClick?.(items, id))

  const data = useMemo<FeatureCollection<Point>>(() => ({
    type: 'FeatureCollection',
    features: validPoints
      .map(({ lng, lat }, index) => ({
        type: 'Feature',
        id: index,
        properties: {},
        geometry: { type: 'Point', coordinates: [lng, lat] },
      })),
  }), [validPoints])

  useEffect(() => {
    if (!map || !isLoaded) return

    const clusterLayerId = `${sourceId}-clusters`
    const countLayerId = `${sourceId}-count`

    map.addSource(sourceId, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
      cluster: true,
      clusterRadius: 50,
      clusterMaxZoom: 14,
    })

    map.addLayer({
      id: clusterLayerId,
      type: 'circle',
      source: sourceId,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': color,
        'circle-radius': ['step', ['get', 'point_count'], 22, 100, 28, 750, 34],
        'circle-stroke-width': 2,
        'circle-stroke-color': strokeColor,
      },
    })

    map.addLayer({
      id: countLayerId,
      type: 'symbol',
      source: sourceId,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['Open Sans Regular'],
        'text-size': textSize,
        'text-allow-overlap': true,
        'text-ignore-placement': true,
      },
      paint: { 'text-color': textColor },
    })

    return () => {
      if (!map.getStyle()) return

      for (const layerId of [countLayerId, clusterLayerId]) {
        if (map.getLayer(layerId)) map.removeLayer(layerId)
      }
      if (map.getSource(sourceId)) map.removeSource(sourceId)
    }
  }, [map, isLoaded, sourceId, color, strokeColor, textColor, textSize])

  useEffect(() => {
    if (!map || !isLoaded) return

    const clusterLayerId = `${sourceId}-clusters`
    let active = true
    map.getSource<GeoJSONSource>(sourceId)?.setData(data)

    const selectCluster = async (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0]
      const source = map.getSource<GeoJSONSource>(sourceId)
      const clusterId: unknown = feature?.properties.cluster_id
      const pointCount: unknown = feature?.properties.point_count

      if (!source || feature?.geometry.type !== 'Point'
        || typeof clusterId !== 'number' || typeof pointCount !== 'number') return

      // Only select the topmost group when clusters overlap.
      const topFeature = map.queryRenderedFeatures(event.point)
        .find((item) => item.source.startsWith('cluster-group-'))
      if (topFeature?.source !== sourceId) return

      const [lng, lat] = feature.geometry.coordinates

      try {
        const [leaves, zoom] = await Promise.all([
          source.getClusterLeaves(clusterId, pointCount, 0),
          source.getClusterExpansionZoom(clusterId),
        ])
        if (!active || map.getSource(sourceId) !== source) return

        const items = leaves.flatMap((leaf) => {
          const point = typeof leaf.id === 'number' ? validPoints[leaf.id] : undefined
          return point ? [point.data] : []
        })

        map.easeTo({ center: [lng, lat], zoom, duration: 600 })
        notifyClusterClick(items)
      } catch (error) {
        if (active) console.error('No se pudo seleccionar el cluster.', error)
      }
    }
    const showPointer = () => { map.getCanvas().style.cursor = 'pointer' }
    const resetPointer = () => { map.getCanvas().style.cursor = '' }

    const syncMarkers = () => {
      if (!map.getSource(sourceId) || !map.isSourceLoaded(sourceId)) return

      // A point can occur in multiple tiles; keep one marker per publication.
      const visiblePoints = new Map<number, UnclusteredPoint<TItem>>()
      for (const feature of map.querySourceFeatures(sourceId, {
        filter: ['!', ['has', 'point_count']],
      })) {
        if (feature.geometry.type !== 'Point' || typeof feature.id !== 'number') continue

        const originalPoint = validPoints[feature.id]
        if (!originalPoint) continue

        // Source queries return tile coordinates; preserve the exact location.
        const { lng, lat } = originalPoint
        visiblePoints.set(feature.id, { id: feature.id, lng, lat, data: originalPoint.data })
      }

      const nextPoints = [...visiblePoints.values()].sort((a, b) => a.id - b.id)
      setUnclusteredPoints((currentPoints) => {
        const unchanged = currentPoints.length === nextPoints.length
          && currentPoints.every((point, index) => {
            const nextPoint = nextPoints[index]
            return point.id === nextPoint.id && point.lng === nextPoint.lng
              && point.lat === nextPoint.lat && point.data === nextPoint.data
          })
        return unchanged ? currentPoints : nextPoints
      })
    }

    map.on('render', syncMarkers)
    map.on('click', clusterLayerId, selectCluster)
    map.on('mouseenter', clusterLayerId, showPointer)
    map.on('mouseleave', clusterLayerId, resetPointer)
    return () => {
      active = false
      map.off('render', syncMarkers)
      map.off('click', clusterLayerId, selectCluster)
      map.off('mouseenter', clusterLayerId, showPointer)
      map.off('mouseleave', clusterLayerId, resetPointer)
      resetPointer()
    }
  }, [map, isLoaded, sourceId, data, validPoints, color, strokeColor, textColor, textSize])

  return isLoaded && unclusteredPoints.map(({ id: pointId, lng, lat, data: item }) => (
    <MapCNMarker
      key={pointId}
      longitude={lng}
      latitude={lat}
      color={color}
      {...marker}
      onClick={() => onMarkerClick?.(item, id)}
    />
  ))
}
