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
  
  const showFloatingButton = location.pathname === '/mis-publicaciones'
  const showHeader = '/mis-publicaciones'
  
  const routesWithoutNavigation = [
    "/publicar/campania",
    "/publicar/animal",
    "/publicar/colecta",
    '/mis-publicaciones'
  ];

  const hideNavigation = routesWithoutNavigation.includes(location.pathname);
  
  return (
    <MobileViewChrome>
      { (!hideNavigation || showHeader) && <Header /> }

      {
        showFloatingButton && (
          <PublishFloatingButton showText={false}/>
        )
      }

      <AuthenticatedMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {(!hideNavigation) && (
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(true)}
          onNavigate={() => setIsMenuOpen(false)}
        />
      )}

      <AuthenticatedMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileViewChrome>
  );
}

export default MobileAuthenticatedView;
