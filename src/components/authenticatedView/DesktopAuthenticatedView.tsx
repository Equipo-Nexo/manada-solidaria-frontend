import { useState } from 'react'
import Header from '../header/Header'
import PublishFloatingButton from '../publishFloatingButton/PublishFloatingButton'
import AuthenticatedMenuOverlay from './AuthenticatedMenuOverlay'
import { DesktopViewChrome } from './AuthenticatedView.styles'

type DesktopAuthenticatedViewProps = {
  showFloatingPublish: boolean
}

function DesktopAuthenticatedView({ showFloatingPublish }: DesktopAuthenticatedViewProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <DesktopViewChrome>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {showFloatingPublish && <PublishFloatingButton />}
      <AuthenticatedMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </DesktopViewChrome>
  )
}

export default DesktopAuthenticatedView
