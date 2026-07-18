import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../store/store'

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken

      if (accessToken && !headers.has('authorization')) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
});
