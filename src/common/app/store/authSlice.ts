import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthTokens = {
  userId: string;
  accessToken: string
}

export type AuthState = AuthTokens & {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  userId: '',
  accessToken: '',
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (_state, action: PayloadAction<AuthTokens>) => {
      return {
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
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
