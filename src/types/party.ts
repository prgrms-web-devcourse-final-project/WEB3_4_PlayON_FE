import { gameSimple } from './games';
import { userSimple } from './user';

export interface party {
  party_name: string;
  start_time: Date;
  tag: string[];
  participation: userSimple[];
  selected_game: gameSimple;
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
