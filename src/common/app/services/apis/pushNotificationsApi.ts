import { baseAuthenticatedApi } from '@app/services/base/baseAuthenticatedApi'
import type {
  PushSubscriptionRequest,
  RemovePushSubscriptionRequest,
} from '@app/services/requests/pushSubscriptionRequest'

export const pushNotificationsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    registerPushSubscription: builder.mutation<void, PushSubscriptionRequest>({
      query: (body) => ({
        url: '/push-notifications/subscribe',
        method: 'POST',
        body,
      }),
    }),
    removePushSubscription: builder.mutation<void, RemovePushSubscriptionRequest>({
      query: (body) => ({
        url: '/push-notifications/unsubscribe',
        method: 'DELETE',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useRegisterPushSubscriptionMutation,
  useRemovePushSubscriptionMutation,
} = pushNotificationsApi
