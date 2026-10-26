import { baseAuthenticatedApi } from "@/common/app/services/base/baseAuthenticatedApi";
import type { NotificationsResponse } from "../types/notifications.types";

export const notificationsApi = baseAuthenticatedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotifications: builder.query<NotificationsResponse, string>({
      query: (userId) => `/users/${userId}/notifications`,
      providesTags: ["Notifications"],
    }),

    markAllNotificationsAsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/read",
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),

    markNotificationAsRead: builder.mutation<void, string>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} = notificationsApi;
