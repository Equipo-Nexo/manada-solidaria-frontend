import { useEffect, useRef } from 'react'
import { Camera, Transfer, X } from '../../icons'
import * as S from './CameraCapture.styles'

type Props = {
  stream: MediaStream
  canSwitchCamera: boolean
  zoom: number
  zoomRange: { min: number; max: number; step: number } | null
  onCapture: (video: HTMLVideoElement) => void
  onClose: () => void
  onSwitchCamera: () => void
  onZoomChange: (zoom: number) => void
}

function CameraCapture({ stream, canSwitchCamera, zoom, zoomRange, onCapture, onClose,
  onSwitchCamera, onZoomChange }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream
  }, [stream])

  return (
    <S.Backdrop>
      <S.Dialog role="dialog" aria-modal="true" aria-label="Tomar foto">
        <S.Preview ref={videoRef} autoPlay playsInline muted />
        <S.CloseButton type="button" onClick={onClose} aria-label="Cerrar cámara"><X /></S.CloseButton>
        <S.Controls>
          {zoomRange && zoomRange.max > zoomRange.min && (
            <S.ZoomControl>
              <S.ZoomLabel htmlFor="camera-zoom">Zoom {zoom.toFixed(1)}×</S.ZoomLabel>
              <input id="camera-zoom" type="range" min={zoomRange.min} max={zoomRange.max}
                step={zoomRange.step || 0.1} value={zoom}
                onChange={(event) => onZoomChange(Number(event.target.value))} />
            </S.ZoomControl>
          )}
          <S.Actions>
            <S.SideButton type="button" onClick={onSwitchCamera} disabled={!canSwitchCamera}
              aria-label="Cambiar cámara"><Transfer /></S.SideButton>
            <S.CaptureButton type="button" onClick={() => videoRef.current && onCapture(videoRef.current)}
              aria-label="Tomar foto"><Camera /></S.CaptureButton>
            <S.Spacer />
          </S.Actions>
        </S.Controls>
      </S.Dialog>
    </S.Backdrop>
  )
}

export default CameraCapture
