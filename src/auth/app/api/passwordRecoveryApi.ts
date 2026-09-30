import type { PasswordRecoveryRequest } from "./requests/PasswordRecoveryRequest";
import { baseAuthenticatedApi } from "@/common/app/services/base/baseAuthenticatedApi";

export const passwordRecoveryApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    requestPasswordRecovery: builder.mutation<void, PasswordRecoveryRequest>({
      query: (body) => ({
        url: "/password-recovery/request",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRequestPasswordRecoveryMutation } = passwordRecoveryApi;
