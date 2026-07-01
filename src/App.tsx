import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import {
  AppContent,
  AppShell,
  DesktopMenuDrawer,
  DrawerBackdrop,
  DrawerPanel,
} from './App.styles'
import AppHeader from './components/header/AppHeader'
import { InstallButton } from './components/install_button/installButton'
import Navbar from './components/navbar/Navbar'
import PublishFloatingButton from './components/publishFloatingButton/PublishFloatingButton'
import Campaigns from './pages/campaigns/Campaigns'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Map from './pages/map/Map'
import Menu from './pages/menu/Menu'

function App() {
  const location = useLocation()
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const isLoggedIn = location.pathname !== '/login'
  const isFullScreenMenu = location.pathname === '/menu'
  const isFullScreenPage = isFullScreenMenu || location.pathname === '/login'
  const showAuthenticatedShell = isLoggedIn && !isFullScreenMenu
  const showFloatingPublish = showAuthenticatedShell && location.pathname === '/home'
  const username = 'Usuario'
  const userEmail = 'usuario@manadasolidaria.org'

  return (
    <>
      <AppShell>
        {showAuthenticatedShell && (
          <AppHeader username={username} onMenuClick={() => setIsDesktopMenuOpen(true)} />
        )}
        <AppContent $isFullScreen={isFullScreenPage}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/campanias" element={<Campaigns />} />
            <Route path="/mapa" element={<Map />} />
            <Route path="/menu" element={<Menu username={username} email={userEmail} />} />
            <Route path="/mas" element={<Navigate to="/menu" replace />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AppContent>
        {showFloatingPublish && <PublishFloatingButton />}
        {showAuthenticatedShell && <Navbar />}
      </AppShell>
      {showAuthenticatedShell && (
        <DesktopMenuDrawer $isOpen={isDesktopMenuOpen} aria-hidden={!isDesktopMenuOpen}>
          <DrawerBackdrop
            type="button"
            aria-label={'Cerrar men\u00fa'}
            onClick={() => setIsDesktopMenuOpen(false)}
          />
          <DrawerPanel aria-label={'Men\u00fa principal'}>
            <Menu
              username={username}
              email={userEmail}
              onNavigate={() => setIsDesktopMenuOpen(false)}
            />
          </DrawerPanel>
        </DesktopMenuDrawer>
      )}
      <InstallButton />
    </>
  )
}

export default App
