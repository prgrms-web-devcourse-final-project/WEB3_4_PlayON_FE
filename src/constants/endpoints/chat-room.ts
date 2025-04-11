export const CHAT_ENDPOINTS = Object.freeze({
  join: (partyId: number) => `/chat/enter/${partyId}`,
  leave: (partyId: number) => `/chat/leave/${partyId}`,
  subscribe_message: (partyId: number) => `/topic/chat/party/${partyId}`,
});
