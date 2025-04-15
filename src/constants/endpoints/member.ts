export const MEMBER_ENDPOINTS = Object.freeze({
  me: '/members/me',
  modify: '/members/me',
  delete: '/members/me',
  signup: '/members/signup',
  login: '/members/login',
  nickname: '/members/nickname',
  games: '/members/me/games',
  guilds: '/members/me/guilds',
  userguilds: (memberId: number) => `/members/${memberId}/guilds`,

  steamLinks: '/members/steamLink',
  profileImg: '/members/me/image',

  partyAccept: (partyId: number) => `/members/me/parties/${partyId}`,
  partyDecline: (partyId: number) => `/members/me/parties/${partyId}`,
  partyJoinCancel: (partyId: number | string) => `/members/me/parties/pending/${partyId}`,

  otherMember: (memberId: number) => `/members/member/${memberId}`,

  myParties: '/members/me/parties',
  myPartyLogs: '/members/me/parties/logs',

  userParties: (memberId: number) => `/members/${memberId}/parties`,
  userPartyLogs: (memberId: number) => `/members/${memberId}/parties/logs`,
});
