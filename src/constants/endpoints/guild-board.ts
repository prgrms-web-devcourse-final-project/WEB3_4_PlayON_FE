export const GUILD_BOARD_ENDPOINTS = Object.freeze({
  guildPostDetail: (guildId: string, boardId: string) => `/api/guilds/${guildId}/board/${boardId}`,
  guildPostChange: (guildId: string, boardId: string) => `/api/guilds/${guildId}/board/${boardId}`,
  guildPostDelete: (guildId: string, boardId: string) => `/api/guilds/${guildId}/board/${boardId}`,
  guildPostCommentChange: (guildId: string, boardId: string, commentId: string) =>
    `/api/guilds/${guildId}/board/${boardId}/comments/${commentId}`,
  guildPostCommentDelete: (guildId: string, boardId: string, commentId: string) =>
    `/api/guilds/${guildId}/board/${boardId}/comments/${commentId}`,
  guildPostList: (guildId: string) => `/api/guilds/${guildId}/board`,
  guildPostCreate: (guildId: string) => `/api/guilds/${guildId}/board`,
  guildPostLike: (guildId: string, boardId: string) => `/api/guilds/${guildId}/board/${boardId}/like`,
  guildPostCommentCreate: (guildId: string, boardId: string) => `/api/guilds/${guildId}/board/${boardId}/comments`,
  guildNoticesPost: (guildId: string) => `/api/guilds/${guildId}/boards/notices`,
  guildLatestPost: (guildId: string) => `/api/guilds/${guildId}/boards/latest`,
  guildPostImageUpload: () => `/api/guilds/board/image-upload-url`,
});
