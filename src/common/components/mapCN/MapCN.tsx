import {
  forwardRef,
  useCallback,
  useEffect,
  useEffectEvent,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from 'react'
import { createPortal } from 'react-dom'
import * as maplibregl from 'maplibre-gl'
import type {
  Map as MapLibreMap,
  MapOptions,
  MarkerOptions,
  StyleSpecification,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import mapLibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { LocationPin, MapPin } from '../../icons'
import * as S from './MapCN.styles'
import type { MapControlPosition } from './MapCN.styles'
import { MapContext, useMapCN } from './mapCNContext'

const DEFAULT_MAP_STYLE =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

maplibregl.setWorkerUrl(mapLibreWorkerUrl)

export type MapCNRef = MapLibreMap

export type MapCNProps = Omit<MapOptions, 'container' | 'style'> & {
  children?: ReactNode
  className?: string
  mapStyle?: string | StyleSpecification
  loading?: boolean
  onMapReady?: (map: MapLibreMap) => void
}

export const MapCN = forwardRef<MapCNRef, MapCNProps>(function MapCN(
  {
    children,
    className,
    mapStyle = DEFAULT_MAP_STYLE,
    loading = false,
    onMapReady,
    center,
    zoom,
    ...mapOptions
  },
  forwardedRef,
) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef({ ...mapOptions, center, zoom })
  const [map, setMap] = useState<MapLibreMap | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const notifyMapReady = useEffectEvent((mapInstance: MapLibreMap) => {
    onMapReady?.(mapInstance)
  })

  useImperativeHandle(forwardedRef, () => map as MapLibreMap, [map])

  useEffect(() => {
    if (!canvasRef.current) return

    const mapInstance = new maplibregl.Map({
      ...optionsRef.current,
      container: canvasRef.current,
      style: mapStyle,
      attributionControl: {
        compact: true,
      },
    })

    const handleLoad = () => {
      setIsLoaded(true)
      notifyMapReady(mapInstance)
    }
    const resizeObserver = new ResizeObserver(() => mapInstance.resize())

    mapInstance.on('load', handleLoad)
    resizeObserver.observe(canvasRef.current)
    setMap(mapInstance)

    return () => {
      resizeObserver.disconnect()
      mapInstance.off('load', handleLoad)
      mapInstance.remove()
      setMap(null)
      setIsLoaded(false)
    }
  }, [mapStyle])

  useEffect(() => {
    if (!map || !center) return

    map.easeTo({
      center,
      ...(zoom !== undefined && { zoom }),
      duration: isLoaded ? 600 : 0,
    })
  }, [center, isLoaded, map, zoom])

  const contextValue = useMemo(() => ({ map, isLoaded }), [map, isLoaded])

  return (
    <MapContext.Provider value={contextValue}>
      <S.MapRoot className={className}>
        <S.MapCanvas ref={canvasRef} />
        {(!isLoaded || loading) && (
          <S.LoadingOverlay role="status" aria-label="Cargando mapa">
            <S.LoadingIndicator />
          </S.LoadingOverlay>
        )}
        {map && children}
      </S.MapRoot>
    </MapContext.Provider>
  )
})

export type MapCNMarkerProps = Omit<MarkerOptions, 'element'> & {
  longitude: number
  latitude: number
  children?: ReactNode
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  iconColor?: string
  borderColor?: string
  onClick?: () => void
}

export function MapCNMarker({
  longitude,
  latitude,
  children,
  color,
  icon: Icon = MapPin,
  iconColor,
  borderColor,
  onClick,
  ...markerOptions
}: MapCNMarkerProps) {
  const { map } = useMapCN()
  const [markerElement] = useState(() => {
    const element = document.createElement('button')
    element.type = 'button'
    element.setAttribute('aria-label', 'Ver ubicación')
    element.style.cssText = 'border:0;padding:0;background:transparent;cursor:pointer'
    return element
  })
  const [marker] = useState(() =>
    new maplibregl.Marker({
      anchor: 'bottom',
      ...markerOptions,
      element: markerElement,
    }).setLngLat([longitude, latitude]),
  )
  const notifyClick = useEffectEvent((event: MouseEvent) => {
    if (!onClick) return
    event.stopPropagation()
    onClick()
  })

  useEffect(() => {
    const handleClick = (event: MouseEvent) => notifyClick(event)
    markerElement.addEventListener('click', handleClick)

    return () => markerElement.removeEventListener('click', handleClick)
  }, [markerElement])

  useEffect(() => {
    if (!map) return

    marker.addTo(map)
    return () => {
      marker.remove()
    }
  }, [map, marker])

  useEffect(() => {
    marker.setLngLat([longitude, latitude])
  }, [latitude, longitude, marker])

  return createPortal(
    children ?? (
      <S.Marker $iconColor={iconColor}>
        <S.MarkerShape $color={color} $borderColor={borderColor} aria-hidden="true">
          <path d="M24 2C11.85 2 2 11.85 2 24c0 9.5 6 17.6 14.4 20.7l6.1 8.5a1.85 1.85 0 0 0 3 0l6.1-8.5C40 41.6 46 33.5 46 24 46 11.85 36.15 2 24 2Z" />
        </S.MarkerShape>
        <Icon aria-hidden="true" />
      </S.Marker>
    ),
    markerElement,
  )
}

export type MapCNControlsProps = {
  position?: MapControlPosition
  showZoom?: boolean
  showLocate?: boolean
  onLocate?: (coordinates: { longitude: number; latitude: number }) => void
}

export function MapCNControls({
  position = 'bottom-right',
  showZoom = true,
  showLocate = false,
  onLocate,
}: MapCNControlsProps) {
  const { map } = useMapCN()

  const zoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 })
  }, [map])

  const zoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 })
  }, [map])

  const locate = useCallback(() => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      const coordinates = {
        longitude: coords.longitude,
        latitude: coords.latitude,
      }
      map?.flyTo({ center: [coordinates.longitude, coordinates.latitude], zoom: 14 })
      onLocate?.(coordinates)
    })
  }, [map, onLocate])

  return (
    <S.Controls $position={position} aria-label="Controles del mapa">
      {showZoom && (
        <>
          <S.ControlButton type="button" onClick={zoomIn} aria-label="Acercar">
            +
          </S.ControlButton>
          <S.ControlButton type="button" onClick={zoomOut} aria-label="Alejar">
            −
          </S.ControlButton>
        </>
      )}
      {showLocate && (
        <S.ControlButton type="button" onClick={locate} aria-label="Ir a mi ubicación">
          <LocationPin aria-hidden="true" />
        </S.ControlButton>
      )}
    </S.Controls>
  )
}
