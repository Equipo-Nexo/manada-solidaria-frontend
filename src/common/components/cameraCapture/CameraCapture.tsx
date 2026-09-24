import { useEffect, useMemo, useRef } from 'react'
import { Camera, Transfer, X } from '../../icons'
import Gallery from '../../icons/Gallery'
import * as S from './CameraCapture.styles'

type ZoomRange = { min: number; max: number; step: number }

type Props = {
  stream: MediaStream
  canSwitchCamera: boolean
  zoom: number
  zoomRange: ZoomRange | null
  onCapture: (video: HTMLVideoElement) => void
  onChooseFromGallery: () => void
  onClose: () => void
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

function CameraCapture({ stream, canSwitchCamera, zoom, zoomRange, onCapture, onChooseFromGallery,
  onClose, onSwitchCamera, onZoomChange }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const zoomPresets = useMemo(() => zoomRange ? getZoomPresets(zoomRange) : [], [zoomRange])

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream
  }, [stream])

  return (
    <S.Backdrop>
      <S.Dialog role="dialog" aria-modal="true" aria-label="Tomar foto">
        <S.Preview ref={videoRef} autoPlay playsInline muted />
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
