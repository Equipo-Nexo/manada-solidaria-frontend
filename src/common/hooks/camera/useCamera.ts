import { Camera, CameraDirection, CameraErrorCode, MediaTypeSelection, type MediaResult } from '@capacitor/camera'
import { useCallback, useState } from 'react'
import { useToast } from '../toast/useToast'

export type CameraStatus = 'idle' | 'requesting' | 'captured' | 'denied' | 'unavailable'
export type CapturedPhoto = { file: File | null; media: MediaResult; url: string }
type UseCameraOptions = { quality?: number }
const DEFAULT_CAMERA_OPTIONS: Required<UseCameraOptions> = { quality: 90 }

async function mediaToFile(media: MediaResult) {
  if (!media.webPath) return null
  const response = await fetch(media.webPath)
  const blob = await response.blob()
  const extension = media.metadata?.format || 'jpeg'
  return new File([blob], `foto-${Date.now()}.${extension}`, { type: blob.type })
}

function errorMessage(error: unknown) {
  return error && typeof error === 'object' && 'message' in error
    ? String(error.message) : 'No pudimos acceder a la cámara o galería.'
}

function errorCode(error: unknown) {
  return error && typeof error === 'object' && 'code' in error ? String(error.code) : null
}

export function useCamera(options: UseCameraOptions = DEFAULT_CAMERA_OPTIONS) {
  const { quality } = { ...DEFAULT_CAMERA_OPTIONS, ...options }
  const toast = useToast()
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<CameraStatus>('idle')

  const clearCapturedPhoto = useCallback(() => setCapturedPhoto(null), [])

  const handleError = useCallback((cameraError: unknown) => {
    const message = errorMessage(cameraError)
    const code = errorCode(cameraError)
    const denied = code === CameraErrorCode.CameraPermissionDenied ||
      code === CameraErrorCode.GalleryPermissionDenied || /denied|permission|not allowed/i.test(message)
    const cancelled = code === CameraErrorCode.TakePhotoCancelled ||
      code === CameraErrorCode.ChooseMediaCancelled || /cancel/i.test(message)
    setError(message)
    setStatus(cancelled ? 'idle' : denied ? 'denied' : 'unavailable')
    if (!cancelled) {
      if (denied) {
        toast.error('Permiso rechazado', 'Podés volver a habilitarlo desde la configuración del dispositivo.')
      } else {
        toast.information('No pudimos obtener la foto', 'Intentá nuevamente.')
      }
    }
    return null
  }, [toast])

  const takePhoto = useCallback(async () => {
    setError(null)
    setStatus('requesting')
    try {
      const media = await Camera.takePhoto({
        cameraDirection: CameraDirection.Rear,
        correctOrientation: true,
        editable: 'no',
        includeMetadata: true,
        quality,
        saveToGallery: false,
        webUseInput: false,
      })
      const photo = { file: await mediaToFile(media), media, url: media.webPath ?? media.uri ?? '' }
      setCapturedPhoto(photo)
      setStatus('captured')
      return photo
    } catch (cameraError) { return handleError(cameraError) }
  }, [handleError, quality])

  const chooseFromGallery = useCallback(async () => {
    setError(null)
    setStatus('requesting')
    try {
      const { results } = await Camera.chooseFromGallery({ allowMultipleSelection: false,
        correctOrientation: true, includeMetadata: true, mediaType: MediaTypeSelection.Photo, quality })
      const media = results[0]
      if (!media) { setStatus('idle'); return null }
      const photo = { file: await mediaToFile(media), media, url: media.webPath ?? '' }
      setCapturedPhoto(photo)
      setStatus('captured')
      return photo
    } catch (cameraError) { return handleError(cameraError) }
  }, [handleError, quality])

  const requestCameraPermissions = useCallback(async () => {
    try { return await Camera.requestPermissions({ permissions: ['camera'] }) }
    catch (cameraError) { handleError(cameraError); return null }
  }, [handleError])
  const requestGalleryPermissions = useCallback(async () => {
    try { return await Camera.requestPermissions({ permissions: ['photos'] }) }
    catch (cameraError) { handleError(cameraError); return null }
  }, [handleError])
  return { capturedPhoto, chooseFromGallery, clearCapturedPhoto, error,
    requestCameraPermissions, requestGalleryPermissions, status, takePhoto }
}
