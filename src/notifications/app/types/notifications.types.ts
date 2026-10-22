export type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  readed: boolean;
  redirectTo: string | null;
};

export type NotificationsResponse = {
  hasUnreadNotification: boolean;
  notifications: Notification[];
};
