import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import AppHeader from './components/header/AppHeader'
import { InstallButton } from './components/install_button/installButton'
import Navbar from './components/navbar/Navbar'
import Campaigns from './pages/campaigns/Campaigns'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Map from './pages/map/Map'
import More from './pages/more/More'

function App() {
  const location = useLocation()
  const isLoggedIn = location.pathname !== '/login'
  const username = 'Usuario'

  return (
    <>
      <div className={`app-shell bg-base-100${isLoggedIn ? ' app-shell--authenticated' : ''}`}>
        {isLoggedIn && <AppHeader username={username} />}
        <main className="app-shell__content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/campanias" element={<Campaigns />} />
            <Route path="/mapa" element={<Map />} />
            <Route path="/mas" element={<More />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {isLoggedIn && <Navbar />}
      </div>
      <InstallButton />
    </>
  )
}

export default App
