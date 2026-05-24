import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { InstallButton } from './components/installButton'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

function App() {


  return (
    <>
      <div 
        className="min-h-screen bg-base-100 flex items-center justify-center"
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <InstallButton />
    </>
  )
}

export default App
