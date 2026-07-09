import { useState } from 'react'
import type { ReactNode } from 'react'
import BottomSheet from '../bottomSheet/BottomSheet'
import {
  ImageUploadButton,
  ImageUploadIcon,
  ImageUploadLabel,
  ImageUploadPreview,
} from './ImageUpload.styles'
import { Camera } from '../icons'

type SheetChildren = ReactNode | ((controls: { close: () => void }) => ReactNode)

type ImageUploadProps = {
  children: SheetChildren
  imageUrl?: string
  label?: string
}

function ImageUpload({ children, imageUrl, label = 'Seleccionar foto' }: ImageUploadProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const closeSheet = () => setIsSheetOpen(false)

  return (
    <>
      <ImageUploadButton type="button" onClick={() => setIsSheetOpen(true)}>
        {imageUrl ? (
          <ImageUploadPreview src={imageUrl} alt="" />
        ) : (
          <>
            <ImageUploadIcon>
              <Camera aria-hidden="true" />
            </ImageUploadIcon>
            <ImageUploadLabel>{label}</ImageUploadLabel>
          </>
        )}
      </ImageUploadButton>
      <BottomSheet
        isOpen={isSheetOpen}
        ariaLabel="Seleccionar origen de foto"
        onClose={closeSheet}
      >
        {typeof children === 'function' ? children({ close: closeSheet }) : children}
      </BottomSheet>
    </>
  )
}

export default ImageUpload
