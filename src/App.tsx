import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppContent, AppShell } from './App.styles'
import DesktopAuthenticatedView from './components/authenticatedView/DesktopAuthenticatedView'
import MobileAuthenticatedView from './components/authenticatedView/MobileAuthenticatedView'
import { InstallButton } from './components/install_button/installButton'
import Campaigns from './pages/campaigns/Campaigns'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Map from './pages/map/Map'
import Register from './pages/register/Register'
import useAuth from './hooks/auth/useAuth'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const isFullScreenPage = location.pathname === '/login' || location.pathname === '/registro'
  const showAuthenticatedShell = isAuthenticated && !isFullScreenPage
  const showFloatingPublish = showAuthenticatedShell && location.pathname === '/home'

  return (
    <>
      <AppShell>
        {showAuthenticatedShell && (
          <>
            <MobileAuthenticatedView />
            <DesktopAuthenticatedView showFloatingPublish={showFloatingPublish} />
          </>
        )}
        <AppContent $isFullScreen={isFullScreenPage}>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/registro"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />}
            />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/campanias" element={<Campaigns />} />
              <Route path="/mapa" element={<Map />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AppContent>
      </AppShell>
      <InstallButton />
    </>
  )
}

export default App
