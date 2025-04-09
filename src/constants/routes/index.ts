import { COMMUNITY_ROUTE } from './community';
import { GAME_ROUTE } from './game';
import { GUILD_ROUTE } from './guild';
import { PARTY_ROUTE } from './party';
import { USER_ROUTE } from './user';

export const PATH = Object.freeze({
  main: '/',
  ...USER_ROUTE,
  ...PARTY_ROUTE,
  ...GUILD_ROUTE,
  ...GAME_ROUTE,
  ...COMMUNITY_ROUTE,
});
