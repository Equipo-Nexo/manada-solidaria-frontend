import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'
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
        <AppContent $isFullScreen={isFullScreenMenu}>
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

const AppShell = styled.div`
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
`

const AppContent = styled.main<{ $isFullScreen: boolean }>`
  flex: 1;
  width: ${({ $isFullScreen, theme }) =>
    $isFullScreen ? '100%' : `min(100%, ${theme.layout.contentMaxWidth})`};
  margin: ${({ $isFullScreen }) => ($isFullScreen ? '0' : '0 auto')};
  display: flex;
  align-items: ${({ $isFullScreen }) => ($isFullScreen ? 'stretch' : 'center')};
  justify-content: ${({ $isFullScreen }) => ($isFullScreen ? 'stretch' : 'center')};
  padding: ${({ $isFullScreen }) => ($isFullScreen ? '0' : '24px 18px 96px')};

  @media (min-width: 768px) {
    padding: ${({ $isFullScreen }) => ($isFullScreen ? '0' : '32px')};
  }
`

const DesktopMenuDrawer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};

  @media (max-width: 767px) {
    display: none;
  }
`

const DrawerBackdrop = styled.button`
  position: absolute;
  inset: 0;
  border: 0;
  background: rgb(38 50 56 / 32%);
  opacity: 0;
  cursor: pointer;
  transition: opacity 180ms ease;

  ${DesktopMenuDrawer}[aria-hidden='false'] & {
    opacity: 1;
  }
`

const DrawerPanel = styled.aside`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(380px, 88vw);
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surfacePlain};
  box-shadow: 16px 0 40px rgb(89 65 55 / 18%);
  transform: translateX(-100%);
  transition: transform 220ms ease;

  ${DesktopMenuDrawer}[aria-hidden='false'] & {
    transform: translateX(0);
  }
`

export default App
