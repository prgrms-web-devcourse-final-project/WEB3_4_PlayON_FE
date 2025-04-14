export const FREECOMMUNITY_ENDPOINTS = Object.freeze({
  postDetail: (boardId: number) => `/boards/${boardId}`,
  postUpdate: (boardId: number) => `/boards/${boardId}`,
  postDelete: (boardId: number) => `/boards/${boardId}`,
  postCreate: `/boards`,
  postImg: (boardId: number) => `/boards/${boardId}/img`,
  postList: `/boards/list`,
  postLike: (boardId: number) => `/boards/${boardId}/like`,
  postUnlike: (boardId: number) => `/boards/${boardId}/like`,

  commentUpdate: (boardId: number, commentId: number) => `/boards/${boardId}/comments/${commentId}`,
  commentDelete: (boardId: number, commentId: number) => `/boards/${boardId}/comments/${commentId}`,
  commentGet: (boardId: number) => `/boards/${boardId}/comments`,
  commentCreate: (boardId: number) => `/boards/${boardId}/comments`,
});
