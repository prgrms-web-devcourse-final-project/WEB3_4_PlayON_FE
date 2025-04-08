import { RouteType } from './route';

export const GAME_ROUTE: RouteType = Object.freeze({
  game: '/game',
  game_list: '/game/list',
  game_detail: (input: string[]) => `/game/detail/${input[0]}`,
});
