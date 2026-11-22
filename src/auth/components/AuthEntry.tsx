import { Navigate, useLocation } from 'react-router-dom'
import Login from '@auth/pages/login/Login'
import PasskeyLogin from '@auth/pages/passkey_login/PasskeyLogin'
import { isPasskeyPreferred } from '@auth/services/passkeyPreference'
import {
  getAuthNavigationState,
  getPostAuthDestination,
} from '@auth/utils/authNavigation'
import useAuth from '@hooks/auth/useAuth'

function AuthEntry() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const navigationState = getAuthNavigationState(location)

  if (isAuthenticated) {
    return <Navigate to={getPostAuthDestination(location)} replace />
  }

  if (isPasskeyPreferred() && !navigationState.usePassword) {
    return (
      <Navigate
        to={`/login/passkey${location.search}`}
        replace
        state={navigationState}
      />
    )
  }

  if (location.pathname === '/') {
    return (
      <Navigate
        to={`/login${location.search}`}
        replace
        state={navigationState}
      />
    )
  }

  return <Login />
}

export default AuthEntry

export function PasskeyAuthEntry() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={getPostAuthDestination(location)} replace />
  }

  return <PasskeyLogin />
}
