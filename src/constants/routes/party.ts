export const PARTY_ROUTE = Object.freeze({
  party: '/party',
  party_list: '/party/list',
  party_create: '/party/create',
  party_detail: (partyId: string) => `/party/${partyId}`,
  party_modify: (partyId: string) => `/party/${partyId}/modify`,
  party_log: (partyId: string) => `/party/log/${partyId}`,
});
