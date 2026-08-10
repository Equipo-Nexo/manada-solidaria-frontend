# useAppPermissions

Hook de orquestacion para permisos generales de la aplicacion.

## Import

```tsx
import { useAppPermissions } from '../../hooks/permissions/useAppPermissions'
```

## Uso en login

```tsx
const { requestLoginPermissions } = useAppPermissions()

const handleLoginSuccess = () => {
  void requestLoginPermissions()
  navigate('/home', { replace: true })
}
```

## API

- `requestLoginPermissions()`: pide ubicacion y notificaciones sin bloquear la navegacion.
- `requestNotificationPermission()`: pide permiso de notificaciones push del navegador.

## Notas

- Para obtener coordenadas y usarlas en una pantalla, usar `useGeolocation`.
- Para tomar fotos o elegir desde galeria, usar `useCamera`.
- Este hook existe para agrupar permisos que conviene pedir en momentos globales, como despues de iniciar sesion.
