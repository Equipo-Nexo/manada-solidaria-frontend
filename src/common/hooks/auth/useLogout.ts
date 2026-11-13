import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@store/authSlice'
import { useAppDispatch } from '@store/hooks'

export function useLogout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const performLogout = useCallback(async (): Promise<boolean> => {
    dispatch(logout())
    navigate('/login', { replace: true })
    return true
  }, [dispatch, navigate])

  return { isLoggingOut: false, performLogout }
}
