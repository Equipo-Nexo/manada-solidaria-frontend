import type { AuthTokens } from "@store/authSlice";
import type { LoginRequest, SignupRequest } from "@auth/app/api/requests/authRequests";
import { baseApi } from "@/common/app/services/base/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthTokens, LoginRequest>({
      query: ({ authorization }) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          Authorization: authorization,
        },
      }),
    }),
    signup: builder.mutation<void, SignupRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation } = authApi;
