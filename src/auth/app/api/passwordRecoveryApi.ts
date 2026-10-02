import type {
  PasswordRecoveryRequest,
  VerifyCodeRequest,
} from "./requests/passwordRecoveryRequest";
import { baseAuthenticatedApi } from "@/common/app/services/base/baseAuthenticatedApi";
import type { VerifyCodeResponse } from "./responses/verifyCodeResponse";

export const passwordRecoveryApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    requestPasswordRecovery: builder.mutation<void, PasswordRecoveryRequest>({
      query: (body) => ({
        url: "/password-recovery/request",
        method: "POST",
        body,
      }),
    }),
    verifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: (body) => ({
        url: "/password-recovery/verify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRequestPasswordRecoveryMutation, useVerifyCodeMutation } =
  passwordRecoveryApi;
