import { RouteType } from './route';

export const GUILD_ROUTE: RouteType = Object.freeze({
  guild: '/guild',
  guild_list: '/guild/list',
  guild_detail: (input: string[]) => `guild/${input[0]}`,
  guild_admin: (input: string[]) => `guild/${input[0]}/admin`,
  guild_create: '/guild/create',
  guild_modify: (input: string[]) => `guild/modify/${input[0]}`,
  guild_community: '/guild/community',
  guild_community_detail: (input: string[]) => `guild/community/${input[0]}`,
  guild_community_create: '/guild/community/create',
  guild_community_modify: (input: string[]) => `guild/community/modify/${input[0]}`,
});
