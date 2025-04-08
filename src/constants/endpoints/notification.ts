export const NOTIFICATION_ENDPOINTS = Object.freeze({
  send: '/notifications/send',
  read: (notificationId: string) => `/notifications/${notificationId}/read`,
  list: '/notifications',
  summary: '/notifications/summary',
  subscribe: '/notifications/subscribe',
});
