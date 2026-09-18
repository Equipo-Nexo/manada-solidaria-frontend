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

- `requestLoginPermissions()`: pide ubicacion y notificaciones sin bloquear la navegacion. Solo la primera vez.
- `requestNotificationPermission()`: pide permiso de notificaciones push del navegador. No pasa por el control de "una sola vez".

## Notas

- Para obtener coordenadas y usarlas en una pantalla, usar `useGeolocation`.
- Para tomar fotos o elegir desde galeria, usar `useCamera`.
- Este hook existe para agrupar permisos que conviene pedir en momentos globales, como despues de iniciar sesion.
- `requestLoginPermissions()` deja una marca en `localStorage` (`manadaSolidaria:permissionsRequested`) para no volver a pedir en cada ingreso. En iOS la sesion se pierde al relanzar la PWA, asi que sin esa marca el login vuelve a pedir permisos todas las veces.
- La marca no se borra en el logout: el permiso del navegador es por origen, no por usuario.
