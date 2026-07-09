import { useAppSelector } from '../../app/store/hooks'

function useAuth() {
  return useAppSelector((state) => state.auth)
}

export default useAuth
