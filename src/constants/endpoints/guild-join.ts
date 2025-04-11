export const GUILD_JOIN_ENDPOINTS = Object.freeze({
  join: (guildId: number) => `/guilds/${guildId}/join`,
  reject: (guildId: number, requestId: number) => `/guilds/${guildId}/join/${requestId}/reject`,
  approve: (guildId: number, requestId: number) => `/guilds/${guildId}/join/${requestId}/approve`,
  requests: (guildId: number) => `/guilds/${guildId}/join/requests`,
});
