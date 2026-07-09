# useGeolocation

Hook reutilizable para obtener coordenadas geograficas del usuario.

## Import

```tsx
import { useGeolocation } from '../../hooks/geolocation/useGeolocation'
```

## Uso basico

```tsx
import { useEffect } from 'react'
import { useGeolocation } from '../../hooks/geolocation/useGeolocation'

function NearbyPosts() {
  const { coordinates, error, requestCoordinates, status } = useGeolocation()

  useEffect(() => {
    void requestCoordinates()
  }, [requestCoordinates])

  if (status === 'requesting') {
    return <p>Obteniendo ubicacion...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <p>
      {coordinates?.latitude}, {coordinates?.longitude}
    </p>
  )
}
```

## API

- `requestCoordinates()`: solicita ubicacion y devuelve `{ coordinates, status }`.
- `coordinates`: coordenadas actuales o `null`.
  - `latitude`
  - `longitude`
  - `accuracy`
  - `altitude`
  - `altitudeAccuracy`
  - `heading`
  - `speed`
- `status`: `idle`, `requesting`, `granted`, `denied`, `unsupported` o `unavailable`.
- `error`: ultimo mensaje de error, si existe.

## Ejemplo para publicaciones cercanas

```tsx
const { coordinates, requestCoordinates } = useGeolocation()

const loadNearbyPosts = async () => {
  const result = await requestCoordinates()

  if (!result.coordinates) {
    return
  }

  const { latitude, longitude } = result.coordinates
  // Llamar endpoint con latitude y longitude.
}
```

## Notas

- El hook dispara toasts para permisos rechazados, navegadores no soportados o fallas al obtener ubicacion.
- En navegadores moviles, geolocalizacion tambien puede requerir HTTPS o permisos habilitados para el sitio/app.
