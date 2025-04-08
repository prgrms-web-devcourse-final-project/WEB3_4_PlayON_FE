import { RouteType } from './route';

export const PARTY_ROUTE: RouteType = Object.freeze({
  party: '/party',
  party_list: '/party/list',
  party_create: '/party/create',
  party_detail: (input: string[]) => `/party${input[0]}/detail`,
  party_modify: (input: string[]) => `/party${input[0]}/modify`,
  party_log: (input: string[]) => `/party${input[0]}/log`,
});
