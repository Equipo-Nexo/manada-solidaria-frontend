import Header from '../header/Header'
import Navbar from '../navbar/Navbar'
import { MobileViewChrome } from './AuthenticatedView.styles'
import { useLocation } from 'react-router-dom'
import PublishFloatingButton from '../publishFloatingButton/PublishFloatingButton'

function MobileAuthenticatedView() {
  const location = useLocation()
  
  const showFloatingButton = location.pathname === '/mis-publicaciones'
  
  const routesWithoutNavigation = [
    "/publicar/campania",
    "/publicar/animal",
    "/publicar/colecta",
    '/mis-publicaciones'
  ];
  
  const hideNavigation = routesWithoutNavigation.includes(location.pathname) || location.pathname.startsWith("/editar/colecta");
  const showHeader =
    location.pathname !== '/menu' &&
    (!hideNavigation || location.pathname === '/mis-publicaciones')
  
  return (
    <MobileViewChrome>
      {showHeader && <Header />}

      {
        showFloatingButton && (
          <PublishFloatingButton showText={false}/>
        )
      }

      {(!hideNavigation) && (
        <Navbar />
      )}
    </MobileViewChrome>
  );
}

export default MobileAuthenticatedView;
