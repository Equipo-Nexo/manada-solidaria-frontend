import { Camera, CameraErrorCode, MediaTypeSelection, type MediaResult } from '@capacitor/camera'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useToast } from '../toast/useToast'

export type CameraStatus = 'idle' | 'requesting' | 'captured' | 'denied' | 'unavailable'
export type CapturedPhoto = { file: File | null; media: MediaResult; url: string }
type UseCameraOptions = { quality?: number }
type ZoomCapabilities = MediaTrackCapabilities & { zoom?: { min: number; max: number; step: number } }
type ZoomConstraintSet = MediaTrackConstraintSet & { zoom?: number }
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
  const streamRef = useRef<MediaStream | null>(null)
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([])
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null)
  const [zoomRange, setZoomRange] = useState<{ min: number; max: number; step: number } | null>(null)
  const [zoom, setZoomState] = useState(1)

  const clearCapturedPhoto = useCallback(() => setCapturedPhoto(null), [])
  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setStream(null)
    setZoomRange(null)
    setStatus('idle')
  }, [])

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

  const openCamera = useCallback(async (deviceId?: string) => {
    setError(null)
    setStatus('requesting')
    try {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      const nextStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          ...(deviceId
            ? { deviceId: { exact: deviceId } }
            : { facingMode: { ideal: 'environment' } }),
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })
      streamRef.current = nextStream
      const track = nextStream.getVideoTracks()[0]
      const devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput')
      const capabilities = track.getCapabilities() as ZoomCapabilities
      const range = capabilities.zoom ?? null
      const initialZoom = range ? Math.min(range.max, Math.max(range.min, 1)) : 1
      if (range) {
        await track.applyConstraints({ advanced: [{ zoom: initialZoom } as ZoomConstraintSet] })
      }
      setStream(nextStream)
      setCameraDevices(devices)
      setActiveDeviceId(track.getSettings().deviceId ?? deviceId ?? null)
      setZoomRange(range)
      setZoomState(initialZoom)
      setStatus('idle')
      return nextStream
    } catch (cameraError) { return handleError(cameraError) }
  }, [handleError])

  const takePhoto = useCallback(() => openCamera(), [openCamera])
  const capturePhoto = useCallback(async (video: HTMLVideoElement) => {
    try {
      const track = streamRef.current?.getVideoTracks()[0]
      let blob: Blob | null = null

      if (track && typeof ImageCapture !== 'undefined') {
        try {
          blob = await new ImageCapture(track).takePhoto()
        } catch {
          blob = null
        }
      }

      if (!blob) {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext('2d')?.drawImage(video, 0, 0)
        blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality / 100))
      }

      if (!blob) throw new Error('No pudimos procesar la foto.')
      const extension = blob.type.split('/')[1] || 'jpeg'
      const url = URL.createObjectURL(blob)
      const media = { webPath: url, metadata: { format: extension } } as MediaResult
      const photo = { file: new File([blob], `foto-${Date.now()}.${extension}`, { type: blob.type }), media, url }
      setCapturedPhoto(photo)
      setStatus('captured')
      stopCamera()
      return photo
    } catch (cameraError) { return handleError(cameraError) }
  }, [handleError, quality, stopCamera])

  const switchCamera = useCallback(() => {
    if (cameraDevices.length < 2) return Promise.resolve(null)
    const currentIndex = cameraDevices.findIndex((device) => device.deviceId === activeDeviceId)
    const nextDevice = cameraDevices[(currentIndex + 1) % cameraDevices.length]
    return openCamera(nextDevice.deviceId)
  }, [activeDeviceId, cameraDevices, openCamera])

  const setZoom = useCallback(async (value: number) => {
    const track = streamRef.current?.getVideoTracks()[0]
    if (!track || !zoomRange) return
    const clamped = Math.min(zoomRange.max, Math.max(zoomRange.min, value))
    const step = zoomRange.step || 0.1
    const normalized = Number((zoomRange.min + Math.round((clamped - zoomRange.min) / step) * step).toFixed(2))
    try {
      await track.applyConstraints({ advanced: [{ zoom: normalized } as ZoomConstraintSet] })
      setZoomState(normalized)
    } catch {
      toast.information('No pudimos cambiar el zoom', 'Probá con otro nivel.')
    }
  }, [toast, zoomRange])

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

  const requestCameraPermissions = useCallback(() => openCamera().then((result) => {
    stopCamera()
    return result
  }), [openCamera, stopCamera])
  const requestGalleryPermissions = useCallback(async () => {
    try { return await Camera.requestPermissions({ permissions: ['photos'] }) }
    catch (cameraError) { handleError(cameraError); return null }
  }, [handleError])
  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), [])

  return { capturedPhoto, chooseFromGallery, clearCapturedPhoto, capturePhoto, cameraDevices, error,
    requestCameraPermissions, requestGalleryPermissions, setZoom, status, stopCamera, stream,
    switchCamera, takePhoto, zoom, zoomRange }
}
