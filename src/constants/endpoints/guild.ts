export const GUILD_ENDPOINTS = Object.freeze({
  detail: (guildId: string) => `/guilds/${guildId}`,
  modify: (guildId: string) => `/guilds/${guildId}`,
  delete: (guildId: string) => `/guilds/${guildId}`,
  create: '/guilds',
  upload_image: (guildId: string) => `/guilds/${guildId}/img`,
  list: '/guilds/list',
  detail_member: (guildId: string) => `/guilds/${guildId}/members/page`,
  admin: (guildId: string) => `/guilds/${guildId}/admin`,
  recommend: '/guilds/recommend',
  popular: '/guilds/popular',
});
