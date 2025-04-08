export const GAME_ENDPOINTS = Object.freeze({
  game: (gameId: string) => `/games/${gameId}`,
  party: (gameId: string) => `/games/${gameId}/party`,
  logs: (gameId: string) => `/games/${gameId}/logs`,
  details: (gameId: string) => `/games/${gameId}/details`,
  search: '/games/search',
  recommend: '/games/recommend',
  ranking: '/games/ranking',
  popular: '/games/popular',
  list: '/games/list',
});
