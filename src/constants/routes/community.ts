import { RouteType } from './route';

export const COMMUNITY_ROUTE: RouteType = Object.freeze({
  community: '/community',
  community_detail: (input: string[]) => `/community/${input[0]}`,
  community_create: '/community/create',
  community_modify: (input: string[]) => `/community/modify/${input[0]}`,
});
