import { useCallback } from 'react'
import { useNavigate, type Location } from 'react-router-dom'
import { logout } from '@store/authSlice'
import { useAppDispatch } from '@store/hooks'
import { persistor } from '@store/store'

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const performLogout = useCallback(async (
    returnTo?: Pick<Location, 'pathname' | 'search' | 'hash'>,
  ): Promise<boolean> => {
    dispatch(logout())
    navigate('/login', {
      replace: true,
      state: {
        usePassword: true,
        ...(returnTo ? { from: returnTo } : {}),
      },
    })

    try {
      await persistor.flush()
    } catch {
      // Redux is already cleared in memory even if persistence is unavailable.
    }

    return true
  }, [dispatch, navigate])

  return { isLoggingOut: false, performLogout };
}
