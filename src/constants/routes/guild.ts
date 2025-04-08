export const GUILD_ROUTE = Object.freeze({
  guild: '/guild',
  guild_list: '/guild/list',
  guild_create: '/guild/create',
  guild_detail: (input: string[]) => `/guild/${input[0]}`,
  guild_admin: (input: string[]) => `/guild/${input[0]}/admin`,
  guild_modify: (input: string[]) => `/guild/${input[0]}/admin/modify`,
  guild_community: (input: string[]) => `/guild/${input[0]}/community`,
  guild_community_detail: (input: string[]) => `/guild/${input[0]}/community/${input[1]}`,
  guild_community_modify: (input: string[]) => `/guild/${input[0]}/community/${input[1]}/modify`,
  guild_community_create: (input: string[]) => `/guild/${input[0]}/community/create`,
});
