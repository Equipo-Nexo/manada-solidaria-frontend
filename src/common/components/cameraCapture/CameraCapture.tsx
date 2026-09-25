import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Camera, Transfer, X } from '../../icons'
import Gallery from '../../icons/Gallery'
import * as S from './CameraCapture.styles'

type ZoomRange = { min: number; max: number; step: number }

type Props = {
  stream: MediaStream
  canSwitchCamera: boolean
  zoom: number
  zoomRange: ZoomRange | null
  supportsFocus: boolean
  onCapture: (video: HTMLVideoElement) => void
  onChooseFromGallery: () => void
  onClose: () => void
  onFocusAtPoint: (point: { x: number; y: number }) => Promise<boolean>
  onSwitchCamera: () => void
  onZoomChange: (zoom: number) => void
}

const formatZoom = (value: number) => {
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1)
  return `${formatted.replace(/^0\./, '.')}x`
}

const getZoomPresets = ({ min, max }: ZoomRange) =>
  Array.from(new Set([min, 0.6, 1, 2, 3, 5, max]
    .filter((value) => value >= min && value <= max)
    .map((value) => Number(value.toFixed(1)))))
    .sort((a, b) => a - b)

function CameraCapture({ stream, canSwitchCamera, zoom, zoomRange, supportsFocus, onCapture,
  onChooseFromGallery, onClose, onFocusAtPoint, onSwitchCamera, onZoomChange }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const focusIndicatorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [focusIndicator, setFocusIndicator] = useState<{ left: number; top: number; id: number } | null>(null)
  const zoomPresets = useMemo(() => zoomRange ? getZoomPresets(zoomRange) : [], [zoomRange])

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream
    return () => {
      if (focusIndicatorTimerRef.current) clearTimeout(focusIndicatorTimerRef.current)
    }
  }, [stream])

  const focus = async (clientX: number, clientY: number) => {
    const video = videoRef.current
    if (!video || !supportsFocus || !video.videoWidth || !video.videoHeight) return

    const rect = video.getBoundingClientRect()
    const scale = Math.max(rect.width / video.videoWidth, rect.height / video.videoHeight)
    const renderedWidth = video.videoWidth * scale
    const renderedHeight = video.videoHeight * scale
    const cropX = (renderedWidth - rect.width) / 2
    const cropY = (renderedHeight - rect.height) / 2
    const x = (clientX - rect.left + cropX) / renderedWidth
    const y = (clientY - rect.top + cropY) / renderedHeight

    setFocusIndicator({
      left: ((clientX - rect.left) / rect.width) * 100,
      top: ((clientY - rect.top) / rect.height) * 100,
      id: Date.now(),
    })

    if (focusIndicatorTimerRef.current) clearTimeout(focusIndicatorTimerRef.current)
    const didFocus = await onFocusAtPoint({ x, y })
    if (!didFocus) {
      setFocusIndicator(null)
      return
    }
    focusIndicatorTimerRef.current = setTimeout(() => setFocusIndicator(null), 1000)
  }

  const handlePointerUp = (event: PointerEvent<HTMLVideoElement>) => {
    if (event.button !== 0) return
    void focus(event.clientX, event.clientY)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLVideoElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()
    void focus(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  return (
    <S.Backdrop>
      <S.Dialog role="dialog" aria-modal="true" aria-label="Tomar foto">
        <S.Preview
          ref={videoRef}
          $focusable={supportsFocus}
          autoPlay
          playsInline
          muted
          role={supportsFocus ? 'button' : undefined}
          tabIndex={supportsFocus ? 0 : undefined}
          aria-label={supportsFocus ? 'Vista de cámara. Tocá un punto para enfocar.' : undefined}
          onKeyDown={supportsFocus ? handleKeyDown : undefined}
          onPointerUp={supportsFocus ? handlePointerUp : undefined}
        />
        {focusIndicator && (
          <S.FocusIndicator
            key={focusIndicator.id}
            $left={focusIndicator.left}
            $top={focusIndicator.top}
            aria-hidden="true"
          />
        )}
        <S.CloseButton type="button" onClick={onClose} aria-label="Cerrar cámara"><X /></S.CloseButton>
        <S.Controls>
          {zoomPresets.length > 1 && (
            <S.ZoomPresets aria-label="Zoom de la cámara">
              {zoomPresets.map((preset) => {
                const isActive = Math.abs(zoom - preset) <= Math.max((zoomRange?.step ?? 0.1) / 2, 0.05)
                return (
                  <S.ZoomPresetButton
                    key={preset}
                    type="button"
                    $active={isActive}
                    aria-label={`Zoom ${formatZoom(preset)}`}
                    aria-pressed={isActive}
                    onClick={() => onZoomChange(preset)}
                  >
                    {formatZoom(preset)}
                  </S.ZoomPresetButton>
                )
              })}
            </S.ZoomPresets>
          )}
          <S.Actions>
            <S.SideButton type="button" onClick={onChooseFromGallery}
              aria-label="Elegir de la galería"><Gallery /></S.SideButton>
            <S.CaptureButton type="button" onClick={() => videoRef.current && onCapture(videoRef.current)}
              aria-label="Tomar foto"><Camera /></S.CaptureButton>
            <S.SideButton type="button" onClick={onSwitchCamera} disabled={!canSwitchCamera}
              aria-label="Cambiar cámara"><Transfer /></S.SideButton>
          </S.Actions>
        </S.Controls>
      </S.Dialog>
    </S.Backdrop>
  )
}

export default CameraCapture
