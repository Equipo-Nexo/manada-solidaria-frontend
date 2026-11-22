import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthTokens = {
  userId: string;
  accessToken: string;
};

export type SessionStatus =
  | 'checking'
  | 'authenticated'
  | 'unauthenticated'
  | 'verification-failed'

export type AuthState = AuthTokens & {
  isAuthenticated: boolean
  sessionStatus: SessionStatus
}

const initialState: AuthState = {
  userId: "",
  accessToken: "",
  isAuthenticated: false,
  sessionStatus: 'unauthenticated',
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (_state, action: PayloadAction<AuthTokens>) => {
      return {
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        sessionStatus: 'authenticated',
      }
    },
    sessionRestored: (_state, action: PayloadAction<AuthTokens>) => {
      return {
        userId: action.payload.userId,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        sessionStatus: 'authenticated',
      }
    },
    sessionCheckStarted: (state) => {
      state.sessionStatus = 'checking'
    },
    sessionVerificationFailed: (state) => {
      state.sessionStatus = 'verification-failed'
    },
    logout: () => {
      return initialState;
    },
  },
});

export const {
  loginSuccess,
  logout,
  sessionCheckStarted,
  sessionRestored,
  sessionVerificationFailed,
} = authSlice.actions
export default authSlice.reducer
