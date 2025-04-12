export const NOTIFICATION_ENDPOINTS = Object.freeze({
  send: '/notifications/send',
  read: (notificationId: number) => `/notifications/${notificationId}/read`,
  list: '/notifications',
  summary: '/notifications/summary',
  subscribe: '/notifications/subscribe',
});
