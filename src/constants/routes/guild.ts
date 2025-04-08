export const GUILD_ROUTE = Object.freeze({
  guild: '/guild',
  guild_list: '/guild/list',
  guild_create: '/guild/create',
  guild_detail: (guildId: string) => `/guild/${guildId}`,
  guild_admin: (guildId: string) => `/guild/${guildId}/admin`,
  guild_modify: (guildId: string) => `/guild/${guildId}/admin/modify`,
  guild_community: (guildId: string) => `/guild/${guildId}/community`,
  guild_community_detail: (guildId: string, postId: string) => `/guild/${guildId}/community/${postId}`,
  guild_community_modify: (guildId: string, postId: string) => `/guild/${guildId}/community/${postId}/modify`,
  guild_community_create: (guildId: string) => `/guild/${guildId}/community/create`,
});
