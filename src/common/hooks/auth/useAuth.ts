import { useAppSelector } from '@store/hooks'

function useAuth() {
  return useAppSelector((state) => state.auth)
}

export default useAuth
