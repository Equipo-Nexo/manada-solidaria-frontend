# useCamera

Hook reutilizable para tomar fotos y elegir imagenes desde galeria usando Capacitor Camera.

## Import

```tsx
import { useCamera } from '../../hooks/camera/useCamera'
```

## Uso basico

```tsx
function PublishPhoto() {
  const { capturedPhoto, chooseFromGallery, status, takePhoto } = useCamera()
  const isLoading = status === 'requesting'

  return (
    <>
      <button type="button" disabled={isLoading} onClick={takePhoto}>
        Tomar foto
      </button>
      <button type="button" disabled={isLoading} onClick={chooseFromGallery}>
        Elegir de galeria
      </button>
      {capturedPhoto && <img src={capturedPhoto.url} alt="Foto seleccionada" />}
    </>
  )
}
```

## API

- `takePhoto()`: abre la camara del dispositivo y devuelve `CapturedPhoto | null`.
- `chooseFromGallery()`: abre la galeria y devuelve `CapturedPhoto | null`.
- `capturedPhoto`: ultima foto obtenida. Incluye:
  - `url`: usable como `src` de una imagen.
  - `file`: `File | null`, util para armar un `FormData`.
  - `media`: resultado original de Capacitor con metadata.
- `status`: `idle`, `requesting`, `captured`, `denied` o `unavailable`.
- `error`: ultimo mensaje de error, si existe.
- `clearCapturedPhoto()`: limpia la foto guardada en el hook.
- `requestCameraPermissions()`: pide permiso de camara explicitamente.
- `requestGalleryPermissions()`: pide permiso de fotos/galeria explicitamente.

## Subir al backend

```tsx
const { capturedPhoto, takePhoto } = useCamera()

const handleSubmit = async () => {
  const photo = capturedPhoto ?? (await takePhoto())

  if (!photo?.file) {
    return
  }

  const formData = new FormData()
  formData.append('photo', photo.file)
}
```

## Notas

- `src/main.tsx` registra `@ionic/pwa-elements` para mejorar el flujo Web/PWA.
- En Android/iOS nativo, Capacitor usa los flujos del sistema.
- En Web/PWA, el comportamiento final depende del navegador, pero queda centralizado en este hook.
