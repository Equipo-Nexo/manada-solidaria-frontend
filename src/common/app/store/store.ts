import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storageSession from "redux-persist/es/storage/session";
import { baseAuthenticatedApi } from "../services/base/baseAuthenticatedApi";
import { baseApi } from "../services/base/baseApi";
import authReducer, { logout } from "./authSlice";

const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: logout,
  effect: (_action, { dispatch }) => {
    const runningRequests = [
      ...dispatch(baseAuthenticatedApi.util.getRunningQueriesThunk()),
      ...dispatch(baseAuthenticatedApi.util.getRunningMutationsThunk()),
    ];

    for (const request of runningRequests) {
      request.abort();
    }

    dispatch(baseAuthenticatedApi.util.resetApiState());
    dispatch(baseApi.util.resetApiState());
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [baseAuthenticatedApi.reducerPath]: baseAuthenticatedApi.reducer,
});

const persistedReducer = persistReducer(
  {
    key: "manadaSolidaria",
    storage: storageSession,
    whitelist: ["auth"],
  },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(authListenerMiddleware.middleware)
      .concat(baseApi.middleware, baseAuthenticatedApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
