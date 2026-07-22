import { useState } from 'react'
import { PawPrint } from '../icons'
import { FloatingButton } from './PublishFloatingButton.styles'
import PublishOptions from '../publishOptions/PublishOptions'

interface PublishFloatingButtonProps {
  showText: boolean;
}

function PublishFloatingButton({ showText = true }: PublishFloatingButtonProps) {
  const [isPublishOptionsOpen, setIsPublishOptionsOpen] = useState(false)

  return (
    <>
      <FloatingButton
        type="button"
        aria-label="Publicar"
        aria-expanded={isPublishOptionsOpen}
        onClick={() => setIsPublishOptionsOpen((isOpen) => !isOpen)}
        $showText={showText}
      >
        <PawPrint aria-hidden="true" />
        { showText && <span>Publicar</span> }
      </FloatingButton>
      <PublishOptions
        isOpen={isPublishOptionsOpen}
        placement="desktop"
        onClose={() => setIsPublishOptionsOpen(false)}
      />
    </>
  )
}

export default PublishFloatingButton
