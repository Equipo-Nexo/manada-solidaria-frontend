import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { dispatchToast } from "@hooks/toast/toastEvents";
import { loginSuccess, logout, type AuthTokens } from "@store/authSlice";
import type { RootState } from "@store/store";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  credentials: "include",
});

type RefreshResult = Awaited<ReturnType<typeof refreshBaseQuery>>;

let refreshRequest: Promise<RefreshResult> | null = null;

const baseQueryWithSessionRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const requestAccessToken = (api.getState() as RootState).auth.accessToken;
  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error?.status === 401 &&
    (api.getState() as RootState).auth.isAuthenticated
  ) {
    const currentAccessToken = (api.getState() as RootState).auth.accessToken;

    if (currentAccessToken !== requestAccessToken) {
      return rawBaseQuery(args, api, extraOptions);
    }

    if (refreshRequest === null) {
      refreshRequest = Promise.resolve(
        refreshBaseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions,
        ),
      ).finally(() => {
        refreshRequest = null;
      });
    }

    const refreshResult = await refreshRequest;

    if (refreshResult.data) {
      api.dispatch(loginSuccess(refreshResult.data as AuthTokens));
      result = await rawBaseQuery(args, api, extraOptions);
    } else if ((api.getState() as RootState).auth.isAuthenticated) {
      api.dispatch(logout());
      dispatchToast({
        type: "information",
        toast: {
          title: "Sesión finalizada",
          description: "Tu sesión expiró. Iniciá sesión nuevamente.",
        },
      });
    }
  }

  return result;
};

export const baseAuthenticatedApi = createApi({
  reducerPath: "authenticatedApi",
  baseQuery: baseQueryWithSessionRefresh,
  endpoints: () => ({}),
  tagTypes: [
    "userPosts",
    "AnimalPosts",
    "Campaigns",
    "userProfile",
    "Vets",
    "map",
    "AdoptionForms",
    "Notifications",
  ],
});
