import {
  Camera,
  CameraDirection,
  CameraErrorCode,
  MediaTypeSelection,
  type MediaResult,
} from '@capacitor/camera'
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '../toast/useToast'

export type CameraStatus = 'idle' | 'requesting' | 'captured' | 'denied' | 'unavailable'

export type CapturedPhoto = {
  file: File | null
  media: MediaResult
  url: string
}

type UseCameraOptions = {
  direction?: CameraDirection
  quality?: number
}

const DEFAULT_CAMERA_OPTIONS: Required<UseCameraOptions> = {
  direction: CameraDirection.Rear,
  quality: 90,
}

async function mediaToFile(media: MediaResult) {
  if (!media.webPath) {
    return null
  }

  const response = await fetch(media.webPath)
  const blob = await response.blob()
  const extension = media.metadata?.format || 'jpeg'

  return new File([blob], `foto-${Date.now()}.${extension}`, { type: blob.type })
}

function getCameraErrorMessage(cameraError: unknown) {
  if (cameraError && typeof cameraError === 'object' && 'message' in cameraError) {
    return String(cameraError.message)
  }

  return 'No pudimos acceder a la c\u00e1mara o galer\u00eda.'
}

function getCameraErrorCode(cameraError: unknown) {
  if (cameraError && typeof cameraError === 'object' && 'code' in cameraError) {
    return String(cameraError.code)
  }

  return null
}

export function useCamera(options: UseCameraOptions = DEFAULT_CAMERA_OPTIONS) {
  const { direction, quality } = { ...DEFAULT_CAMERA_OPTIONS, ...options }
  const toast = useToast()
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<CameraStatus>('idle')

  const clearCapturedPhoto = useCallback(() => {
    setCapturedPhoto(null)
  }, [])

  const saveMediaResult = useCallback(async (media: MediaResult) => {
    const file = await mediaToFile(media)
    const nextPhoto = { file, media, url: media.webPath ?? '' }

    setCapturedPhoto(nextPhoto)
    setStatus('captured')

    return nextPhoto
  }, [])

  const handleCameraError = useCallback(
    (cameraError: unknown) => {
      const message = getCameraErrorMessage(cameraError)
      const code = getCameraErrorCode(cameraError)
      const isPermissionDenied =
        code === CameraErrorCode.CameraPermissionDenied ||
        code === CameraErrorCode.GalleryPermissionDenied ||
        /denied|permission|not allowed/i.test(message)
      const isCancelled =
        code === CameraErrorCode.TakePhotoCancelled ||
        code === CameraErrorCode.ChooseMediaCancelled ||
        /cancel/i.test(message)

      setError(message)
      setStatus(isPermissionDenied ? 'denied' : 'unavailable')

      if (isCancelled) {
        setStatus('idle')
        return null
      }

      if (isPermissionDenied) {
        toast.error(
          'Permiso rechazado',
          'Pod\u00e9s volver a habilitarlo desde la configuraci\u00f3n del dispositivo.',
        )
      } else {
        toast.information('No pudimos obtener la foto', 'Intent\u00e1 nuevamente.')
      }

      return null
    },
    [toast],
  )

  const takePhoto = useCallback(async () => {
    setError(null)
    setStatus('requesting')

    try {
      const media = await Camera.takePhoto({
        cameraDirection: direction,
        correctOrientation: true,
        includeMetadata: true,
        quality,
        webUseInput: false,
      })

      return saveMediaResult(media)
    } catch (cameraError) {
      return handleCameraError(cameraError)
    }
  }, [direction, handleCameraError, quality, saveMediaResult])

  const chooseFromGallery = useCallback(async () => {
    setError(null)
    setStatus('requesting')

    try {
      const { results } = await Camera.chooseFromGallery({
        allowMultipleSelection: false,
        correctOrientation: true,
        includeMetadata: true,
        mediaType: MediaTypeSelection.Photo,
        quality,
      })
      const [media] = results

      if (!media) {
        setStatus('idle')
        return null
      }

      return saveMediaResult(media)
    } catch (cameraError) {
      return handleCameraError(cameraError)
    }
  }, [handleCameraError, quality, saveMediaResult])

  const requestCameraPermissions = useCallback(async () => {
    try {
      return await Camera.requestPermissions({ permissions: ['camera'] })
    } catch (cameraError) {
      handleCameraError(cameraError)
      return null
    }
  }, [handleCameraError])

  const requestGalleryPermissions = useCallback(async () => {
    try {
      return await Camera.requestPermissions({ permissions: ['photos'] })
    } catch (cameraError) {
      handleCameraError(cameraError)
      return null
    }
  }, [handleCameraError])

  useEffect(() => {
    return () => {
      setCapturedPhoto(null)
    }
  }, [])

  return {
    capturedPhoto,
    chooseFromGallery,
    clearCapturedPhoto,
    error,
    requestCameraPermissions,
    requestGalleryPermissions,
    status,
    takePhoto,
  }
}
