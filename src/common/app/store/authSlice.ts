import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthTokens = {
  userId: string;
  accessToken: string
  refreshToken: string
}

type AuthState = AuthTokens & {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  userId: '',
  accessToken: '',
  refreshToken: '',
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (_state, action: PayloadAction<AuthTokens>) => {
      return {
        ...action.payload,
        isAuthenticated: true,
      }
    },
    logout: () => {
      return initialState
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
