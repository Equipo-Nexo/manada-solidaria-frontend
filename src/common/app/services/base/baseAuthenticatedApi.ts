import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { dispatchToast } from '@hooks/toast/toastEvents'
import { logout } from '../../store/authSlice'
import type { RootState } from '../../store/store'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

const baseQueryWithUnauthorizedLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401 && (api.getState() as RootState).auth.isAuthenticated) {
    api.dispatch(logout())
    dispatchToast({
      type: 'information',
      toast: {
        title: 'Sesión finalizada',
        description: 'Tu sesión expiró. Iniciá sesión nuevamente.',
      },
    })
  }

  return result
}

export const baseAuthenticatedApi = createApi({
  reducerPath: 'authenticatedApi',
  baseQuery: baseQueryWithUnauthorizedLogout,
  endpoints: () => ({}),
  tagTypes: ['userPosts', 'AnimalPosts', 'Campaigns']
})
