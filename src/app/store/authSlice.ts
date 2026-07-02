import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const ACCESS_TOKEN_KEY = 'manadaSolidaria.accessToken'
const REFRESH_TOKEN_KEY = 'manadaSolidaria.refreshToken'

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

type AuthState = AuthTokens & {
  isAuthenticated: boolean
}

function getStoredToken(key: string) {
  return window.sessionStorage.getItem(key) ?? ''
}

function createInitialState(): AuthState {
  const accessToken = getStoredToken(ACCESS_TOKEN_KEY)
  const refreshToken = getStoredToken(REFRESH_TOKEN_KEY)

  return {
    accessToken,
    refreshToken,
    isAuthenticated: Boolean(accessToken && refreshToken),
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: createInitialState,
  reducers: {
    loginSuccess: (_state, action: PayloadAction<AuthTokens>) => {
      window.sessionStorage.setItem(ACCESS_TOKEN_KEY, action.payload.accessToken)
      window.sessionStorage.setItem(REFRESH_TOKEN_KEY, action.payload.refreshToken)

      return {
        ...action.payload,
        isAuthenticated: true,
      }
    },
    logout: () => {
      window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
      window.sessionStorage.removeItem(REFRESH_TOKEN_KEY)

      return {
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
      }
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
