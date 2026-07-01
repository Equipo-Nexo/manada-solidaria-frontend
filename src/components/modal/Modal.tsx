import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ActionButton, Actions, Backdrop, Body, Card, Content, Title } from './Modal.styles'

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
    <Backdrop role="presentation">
      <Card role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <Content>
          <Title id="modal-title">{title}</Title>
          <Body>{children}</Body>
        </Content>

        <Actions>
          <ActionButton type="button" $variant="secondary" onClick={onSecondaryAction}>
            {secondaryLabel}
          </ActionButton>
          <ActionButton type="button" $variant="primary" onClick={onPrimaryAction}>
            {primaryLabel}
          </ActionButton>
        </Actions>
      </Card>
    </Backdrop>,
    document.body,
  )
}

export default Modal
