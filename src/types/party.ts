import { gameSimple } from './games';
import { userSimple } from './user';

export interface party {
  appid?: number;
  partyId: string;
  party_name: string;
  description: string;
  start_time: Date;
  end_time?: Date;
  tags: string[];
  participation: userSimple[];
  selected_game: gameSimple;
  num_maximum: number;
  num_minimum?: number;
}

export interface partyLog {
  party_info: party;
  player_recommend: playerRecommend[];
  screenshot: userScreenShot[];
  review: partyReview[];
}

export interface partyReview {
  author: userSimple;
  text: string;
}

export interface playerRecommend {
  to: userSimple;
  from: userSimple;
}

export interface userScreenShot {
  img_src: string;
  author: userSimple;
  comment: string;
}

type tag = {
  type: string;
  value: string;
};
export type createPartyReq = {
  name: string;
  description: string;
  partyAt: string;
  isPublic: boolean;
  minimum: number;
  maximum: number;
  appId: number | string;
  tags: tag[];
};

export type getPartiesReq = {
  appId?: string | number;
  genres?: string[];
  tags?: tag[];
};

type onlyValueTag = {
  tagValue: string;
};
export type getPartyRes = {
  description: string;
  gameName: string;
  maximum: number;
  minimum: number;
  partyMembers: userRes[];
  name: string;
  partyAt: Date;
  partyId: number;
  partyTags: onlyValueTag[];
  total: number;
  hit: number;
  appId: number;
  ownerId?: number;
};

export type getMainPendingPartyRes = {
  partyId: number;
  name: string;
  description: string;
  appId: number;
  gameName: string;
  partyAt: string;
  minimum: number;
  maximum: number;
  total: number;
  members: userSimpleRes[];
  partyTags: onlyValueTag[];
};

export type userSimpleRes = {
  memberId: number;
  profileImg: string;
};

export type userRes = {
  memberId: number;
  partyMemberId: number;
  username: string;
  title: string;
  nickname: string;
  profileImg: string;
};
