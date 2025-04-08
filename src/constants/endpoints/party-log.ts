export const PARTYLOG_ENDPOINTS = Object.freeze({
  modify: (logId: string, partyId: string) => `/logs/${logId}/party/${partyId}`,
  delete: (logId: string, partyId: string) => `/logs/${logId}/party/${partyId}`,
  screenshot: (logId: string, partyId: string) => `/logs/${logId}/party/${partyId}/screenshot`,
  list: (partyId: string) => `/logs/party/${partyId}`,
  write: (partyId: string) => `/logs/party/${partyId}`,
});
