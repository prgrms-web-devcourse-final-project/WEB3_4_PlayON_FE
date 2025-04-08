export const COMMUNITY_ROUTE = Object.freeze({
  community: '/community',
  community_detail: (postId: string) => `/community/${postId}`,
  community_modify: (postId: string) => `/community/${postId}/modify`,
  community_create: '/community/create',
});
