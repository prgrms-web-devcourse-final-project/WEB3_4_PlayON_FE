export const GUILD_MEMBER_ENDPOINTS = Object.freeze({
  select_manager: (guildId: string) => `/guilds/${guildId}/managers`,
  delete_manager: (guildId: string) => `/guilds/${guildId}/managers`,
  invite: (guildId: string) => `/guilds/${guildId}/invite`,
  list: (guildId: string) => `/guilds/${guildId}/members`,
  delete_member: (guildId: string) => `/guilds/${guildId}/members`,
  leave: (guildId: string) => `/guilds/${guildId}/members/leave`,
});
