import { useState } from 'react'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import AuthenticatedMenuOverlay from './AuthenticatedMenuOverlay'
import { MobileViewChrome } from './AuthenticatedView.styles'
import { useLocation } from 'react-router-dom'
import PublishFloatingButton from '../publishFloatingButton/PublishFloatingButton'

function MobileAuthenticatedView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  
  const showNavbar = location.pathname !== '/mis-publicaciones'
  const showFloatingButton = location.pathname === '/mis-publicaciones'

  return (
    <MobileViewChrome>
      <Header />
      {
        showNavbar && (
          <Navbar
            isMenuOpen={isMenuOpen}
            onMenuClick={() => setIsMenuOpen(true)}
            onNavigate={() => setIsMenuOpen(false)}
          />
        )
      }
      {
        showFloatingButton && (
          <PublishFloatingButton />
        )
      }
      <AuthenticatedMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </MobileViewChrome>
  )
}

export default MobileAuthenticatedView
