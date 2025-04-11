export const GUILD_BOARD_ENDPOINTS = Object.freeze({
  guildPostDetail: (guildId: number, boardId: number) => `/guilds/${guildId}/board/${boardId}`,
  guildPostChange: (guildId: number, boardId: number) => `/guilds/${guildId}/board/${boardId}`,
  guildPostDelete: (guildId: number, boardId: number) => `/guilds/${guildId}/board/${boardId}`,
  guildPostCommentChange: (guildId: number, boardId: number, commentId: number) =>
    `/guilds/${guildId}/board/${boardId}/comments/${commentId}`,
  guildPostCommentDelete: (guildId: number, boardId: number, commentId: number) =>
    `/guilds/${guildId}/board/${boardId}/comments/${commentId}`,
  guildPostList: (guildId: number) => `/guilds/${guildId}/board`,
  guildPostCreate: (guildId: number) => `/guilds/${guildId}/board`,
  guildPostLike: (guildId: number, boardId: number) => `/guilds/${guildId}/board/${boardId}/like`,
  guildPostCommentCreate: (guildId: number, boardId: number) => `/guilds/${guildId}/board/${boardId}/comments`,
  guildNoticesPost: (guildId: number) => `/guilds/${guildId}/boards/notices`,
  guildLatestPost: (guildId: number) => `/guilds/${guildId}/boards/latest`,
  guildPostImageUpload: (guildId: number, boardId: number) => `/guilds/${guildId}/board/${boardId}/img`,
});
