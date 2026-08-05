import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@hooks/auth/useAuth'

function PrivateRoutes() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default PrivateRoutes
