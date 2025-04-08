import { RouteType } from './route';

export const PARTY_ROUTE: RouteType = Object.freeze({
  party: '/party',
  party_list: '/party/list',
  party_create: '/party/create',
  party_detail: (input: string[]) => `/party/${input[0]}`,
  party_modify: (input: string[]) => `/party/modify/${input[0]}`,
  party_log: (input: string[]) => `/party/log/${input[0]}`,
});
