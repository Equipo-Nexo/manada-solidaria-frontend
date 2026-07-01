import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
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
      <div className={`app-shell bg-base-100${isLoggedIn ? ' app-shell--authenticated' : ''}${isFullScreenMenu ? ' app-shell--fullscreen' : ''}`}>
        {showAuthenticatedShell && (
          <AppHeader username={username} onMenuClick={() => setIsDesktopMenuOpen(true)} />
        )}
        <main className="app-shell__content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/campanias" element={<Campaigns />} />
            <Route path="/mapa" element={<Map />} />
            <Route path="/menu" element={<Menu username={username} email={userEmail} />} />
            <Route path="/mas" element={<Navigate to="/menu" replace />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {showFloatingPublish && <PublishFloatingButton />}
        {showAuthenticatedShell && <Navbar />}
      </div>
      {showAuthenticatedShell && (
        <div
          className={`desktop-menu-drawer${isDesktopMenuOpen ? ' desktop-menu-drawer--open' : ''}`}
          aria-hidden={!isDesktopMenuOpen}
        >
          <button
            className="desktop-menu-drawer__backdrop"
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsDesktopMenuOpen(false)}
          />
          <aside className="desktop-menu-drawer__panel" aria-label="Menú principal">
            <Menu
              username={username}
              email={userEmail}
              onNavigate={() => setIsDesktopMenuOpen(false)}
            />
          </aside>
        </div>
      )}
      <InstallButton />
    </>
  )
}

export default App
