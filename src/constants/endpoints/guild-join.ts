export const GUILD_JOIN_ENDPOINTS = Object.freeze({
  join: (guildId: string) => `/guilds/${guildId}/join`,
  reject: (guildId: string, requestId: string) => `/guilds/${guildId}/join/${requestId}/reject`,
  approve: (guildId: string, requestId: string) => `/guilds/${guildId}/join/${requestId}/approve`,
  requests: (guildId: string) => `/guilds/${guildId}/join/requests`,
});
