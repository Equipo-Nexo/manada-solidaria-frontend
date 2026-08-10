import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  BottomSheetBackdrop,
  BottomSheetCloseButton,
  BottomSheetCloseButtonContainer,
  BottomSheetContent,
  BottomSheetHandle,
  BottomSheetPanel,
} from './BottomSheet.styles'
import X from '../../icons/X'

type BottomSheetProps = {
  children: ReactNode
  isOpen: boolean
  ariaLabel?: string
  onClose: () => void
}

function BottomSheet({ children, isOpen, ariaLabel, onClose }: BottomSheetProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <BottomSheetBackdrop onClick={onClose}>
      <BottomSheetPanel
        aria-label={ariaLabel}
        aria-modal="true"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <BottomSheetHandle aria-hidden="true" />
        <BottomSheetContent>
          <BottomSheetCloseButtonContainer>
            <BottomSheetCloseButton type="button" aria-label="Cerrar" onClick={onClose}>
              <X aria-hidden="true" />
            </BottomSheetCloseButton>
          </BottomSheetCloseButtonContainer>
          {children}
        </BottomSheetContent>
      </BottomSheetPanel>
    </BottomSheetBackdrop>,
    document.body,
  )
}

export default BottomSheet
