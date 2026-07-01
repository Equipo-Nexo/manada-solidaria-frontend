import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

type ModalProps = {
  isOpen: boolean
  title: string
  primaryLabel: string
  secondaryLabel: string
  onPrimaryAction: () => void
  onSecondaryAction: () => void
  children: ReactNode
}

function Modal({
  isOpen,
  title,
  primaryLabel,
  secondaryLabel,
  onPrimaryAction,
  onSecondaryAction,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="modal-backdrop" role="presentation">
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-card__content">
          <h2 className="modal-card__title" id="modal-title">
            {title}
          </h2>
          <div className="modal-card__body">{children}</div>
        </div>

        <div className="modal-card__actions">
          <button className="modal-card__button modal-card__button--secondary" type="button" onClick={onSecondaryAction}>
            {secondaryLabel}
          </button>
          <button className="modal-card__button modal-card__button--primary" type="button" onClick={onPrimaryAction}>
            {primaryLabel}
          </button>
        </div>
      </section>
    </div>,
    document.body,
  )
}

export default Modal
