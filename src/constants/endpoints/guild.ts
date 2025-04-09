export const GUILD_ENDPOINTS = Object.freeze({
  detail: (guildId: string) => `/guilds/${guildId}`,
  modify: (guildId: string) => `/guilds/${guildId}`,
  delete: (guildId: string) => `/guilds/${guildId}`,
  list: '/guilds',
  create: '/guilds',
  admin: (guildId: string) => `/guilds/${guildId}/admin`,
  recommend: '/guilds/recommend',
  popular: '/guilds/popular',
  upload_image: '/guilds/presigned-url',
});
