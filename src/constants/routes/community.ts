export const COMMUNITY_ROUTE = Object.freeze({
  community: '/community',
  community_detail: (input: string[]) => `/community/${input[0]}`,
  community_modify: (input: string[]) => `/community/${input[0]}/modify`,
  community_create: '/community/create',
});
