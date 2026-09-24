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

- `takePhoto()`: abre la cámara integrada. La foto se obtiene mediante `capturePhoto(video)`.
- `capturePhoto(video)`: captura el cuadro actual de un elemento `video` conectado al `stream`.
- `stream`: stream activo de la cámara, o `null` cuando está cerrada.
- `cameraDevices` y `switchCamera()`: permiten alternar entre las cámaras expuestas por el dispositivo.
- `zoom`, `zoomRange` y `setZoom()`: permiten iniciar en `1x` y mostrar los niveles de zoom compatibles.
- `stopCamera()`: detiene la cámara y libera su indicador de privacidad.
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
- La cámara integrada comienza en `1x` siempre que el dispositivo lo soporte.
- Los accesos rápidos de zoom solo muestran valores dentro del rango informado por el dispositivo.
- Algunos navegadores o WebViews no exponen lentes físicos como el ultra gran angular; en esos casos no se mostrará `.6x`.
- El stream solicita resolución Full HD y la captura usa `ImageCapture` cuando está disponible, con respaldo mediante `canvas`.
- La selección desde galería continúa utilizando Capacitor.
