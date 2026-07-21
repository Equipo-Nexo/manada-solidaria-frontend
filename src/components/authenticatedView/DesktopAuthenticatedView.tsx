import { useState } from 'react'
import Header from '../header/Header'
import PublishFloatingButton from '../publishFloatingButton/PublishFloatingButton'
import AuthenticatedMenuOverlay from './AuthenticatedMenuOverlay'
import { DesktopViewChrome } from './AuthenticatedView.styles'

function DesktopAuthenticatedView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const showFloatingPublish = location.pathname === '/home' || location.pathname === '/mis-publicaciones'

  return (
    <DesktopViewChrome>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {showFloatingPublish && <PublishFloatingButton />}
      <AuthenticatedMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </DesktopViewChrome>
  )
}

export default DesktopAuthenticatedView
