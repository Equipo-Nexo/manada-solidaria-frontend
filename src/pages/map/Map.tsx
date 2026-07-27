import { useEffect, useMemo } from 'react'
import { MapCN, MapCNControls, MapCNMarker } from '../../components/mapCN'
import { useGeolocation } from '../../hooks/geolocation/useGeolocation'
import * as S from './Map.styles'

const DEFAULT_POINT = { lng: -58.3816, lat: -34.6037 }

function Map() {
  const { coordinates, requestCoordinates, status } = useGeolocation()

  useEffect(() => {
    void requestCoordinates()
  }, [requestCoordinates])

  const point = useMemo(
    () =>
      coordinates
        ? { lng: coordinates.longitude, lat: coordinates.latitude }
        : DEFAULT_POINT,
    [coordinates],
  )

  return (
    <S.Page>
      <S.Header>
        <h1>Mapa</h1>
        <S.Description>
          {status === 'requesting'
            ? 'Obteniendo tu ubicación...'
            : 'Explorá las publicaciones cercanas a tu ubicación.'}
        </S.Description>
      </S.Header>

      <S.MapFrame>
        <MapCN center={point} zoom={16}>
          <MapCNControls showLocate />
          <MapCNMarker longitude={point.lng} latitude={point.lat} />
        </MapCN>
      </S.MapFrame>
    </S.Page>
  )
}

export default Map
