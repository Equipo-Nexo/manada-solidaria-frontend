import { useState } from 'react'
import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import AuthenticatedMenuOverlay from './AuthenticatedMenuOverlay'
import { MobileViewChrome } from './AuthenticatedView.styles'

function MobileAuthenticatedView() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <MobileViewChrome>
      <Header />
      <Navbar isMenuOpen={isMenuOpen} onMenuClick={() => setIsMenuOpen(true)} />
      <AuthenticatedMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </MobileViewChrome>
  )
}

export default MobileAuthenticatedView
