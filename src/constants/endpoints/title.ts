export const TITLE_ENDPOINTS = Object.freeze({
  my_title: (titleId: string) => `/titles/${titleId}`,
  all_title: '/titles',
});
// 내가 가지고 있는 칭호 리스트 조회 없음
// all_title이 해당 기능을 하는 것이라면 memberId 필요없나?
