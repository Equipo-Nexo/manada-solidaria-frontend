import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@hooks/auth/useAuth'

function PrivateRoutes() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }

  return <Outlet />
}

export default PrivateRoutes
