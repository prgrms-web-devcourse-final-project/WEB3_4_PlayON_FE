'use client';

import { NOTIFICATION_ENDPOINTS } from '@/constants/endpoints/notification';
import { useAxios } from '@/hooks/useAxios';

const NotificationTypes = ['PARTY_INVITE'] as const;
export type Notification = {
  id: number;
  senderNickname: string;
  content: string;
  type: (typeof NotificationTypes)[number];
  isRead: boolean;
  redirectUrl: string;
  createdAt: string;
};

export const useNotification = () => {
  const axios = useAxios();

  async function SendNotification(input: {
    receiverId: string;
    type: (typeof NotificationTypes)[number];
    content: string;
    redirectUrl: string;
  }) {
    const res = await axios.Post(NOTIFICATION_ENDPOINTS.send, { ...input }, {}, true);
    if (res && res.status == 200) {
      return true;
    }
    return false;
  }
  async function ReadNotification(notificationId: number) {
    const res = await axios.Patch(NOTIFICATION_ENDPOINTS.read(notificationId), {}, {}, true);
    if (res && res.status == 200) {
      return res.data.data as Notification;
    }
    return false;
  }
  async function GetNotifications() {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.list, {}, true);
    if (res && res.status == 200) {
      return res.data as Notification[];
    }
    throw new Error('Failed to fetch notifications');
  }
  async function GetNotificationsSummary() {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.summary, {}, true);
    if (res && res.status == 200) {
      return {
        notification: res.data.data as Notification[],
        unreadCount: res.data.data.unreadCount as number,
      };
    }
    throw new Error('Failed to fetch notifications');
  }
  async function SubscribeNotification() {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.subscribe, {}, true);
    if (res && res.status == 200) {
      return {
        timeout: res.data.timeout,
      };
    }
    return false;
  }

  return {
    GetNotifications,
    GetNotificationsSummary,
    SubscribeNotification,
    ReadNotification,
    SendNotification,
  };
};
