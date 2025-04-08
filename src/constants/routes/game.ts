export const GAME_ROUTE = Object.freeze({
  game: '/game',
  game_list: '/game/list',
  game_detail: (input: string[]) => `/game/${input[0]}`,
});
