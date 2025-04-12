export const GAME_ENDPOINTS = Object.freeze({
  game: (gameId: number) => `/games/${gameId}`,
  party: (gameId: number) => `/games/${gameId}/party`,
  logs: (gameId: number) => `/games/${gameId}/logs`,
  details: (gameId: number) => `/games/${gameId}/details`,
  search: '/games/search',
  recommend: '/games/recommend',
  ranking: '/games/ranking',
  popular: '/games/popular',
  list: '/games/list',
  friends: '/games/recommend/friends',
  playTime: '/games/recommend/playtime/top',
});
