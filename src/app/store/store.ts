import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storageSession from 'redux-persist/es/storage/session'
import { baseAuthenticatedApi } from '../services/base/baseAuthenticatedApi'
import { baseApi } from '../services/base/baseApi'
import authReducer from './authSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [baseAuthenticatedApi.reducerPath]: baseAuthenticatedApi.reducer,
})

const persistedReducer = persistReducer(
  {
    key: 'manadaSolidaria',
    storage: storageSession,
    whitelist: ['auth'],
  },
  rootReducer,
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, baseAuthenticatedApi.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
