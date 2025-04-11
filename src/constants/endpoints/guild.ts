export const GUILD_ENDPOINTS = Object.freeze({
  detail: (guildId: number) => `/guilds/${guildId}`,
  modify: (guildId: number) => `/guilds/${guildId}`,
  delete: (guildId: number) => `/guilds/${guildId}`,
  create: '/guilds',
  upload_image: (guildId: number) => `/guilds/${guildId}/img`,
  list: '/guilds/list',
  detail_member: (guildId: number) => `/guilds/${guildId}/members/page`,
  admin: (guildId: number) => `/guilds/${guildId}/admin`,
  recommend: '/guilds/recommend',
  popular: '/guilds/popular',
});
