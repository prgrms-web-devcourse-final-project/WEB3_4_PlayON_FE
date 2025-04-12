'use client';

import { NOTIFICATION_ENDPOINTS } from '@/constants/endpoints/notification';
import { useAxios } from '@/hooks/useAxios';

const NotificationTypes = ['PARTY_INVITE'] as const;
type Notification = {
  id: number;
  senderId: number;
  content: string;
  type: (typeof NotificationTypes)[number];
  isRead: boolean;
  createdAt: string;
  redurectUrl: string;
};

const useNotification = () => {
  const axios = useAxios();

  async function GetNotifications() {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.list, {}, true);
    if (res && res.status == 200) {
      return res.data as Notification[];
    }
    return null;
  }
  async function GetNotificationsSummary() {}
  async function SubscribeNotification() {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.subscribe, {}, true);
    if (res && res.status == 200) {
      return true;
    }
    return false;
  }
  async function ReadNotification(notificationId: number) {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.read(notificationId), {}, true);
    if (res && res.status == 200) {
      return true;
    }
    return false;
  }
  async function SendNotification(receiverId: string) {
    const res = await axios.Get(NOTIFICATION_ENDPOINTS.send, {}, true);
    if (res && res.status == 200) {
      return true;
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
