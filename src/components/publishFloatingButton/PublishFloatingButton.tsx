import { useState } from 'react'
import { PawPrint } from 'lucide-react'
import PublishOptions from '../publishOptions/PublishOptions'
import { FloatingButton } from './PublishFloatingButton.styles'

function PublishFloatingButton() {
  const [isPublishOptionsOpen, setIsPublishOptionsOpen] = useState(false)

  return (
    <>
      <FloatingButton
        type="button"
        aria-label="Publicar"
        aria-expanded={isPublishOptionsOpen}
        onClick={() => setIsPublishOptionsOpen((isOpen) => !isOpen)}
      >
        <PawPrint aria-hidden="true" />
        <span>Publicar</span>
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
