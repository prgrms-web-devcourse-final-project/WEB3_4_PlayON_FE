import { userSimple } from './user';

export interface party {
  party_name: string;
  start_time: Date;
  tag: string[];
  participation: userSimple;
  selected_game: string[];
}

export interface partyLog extends party {
  end_time: Date;
  player_recommend: userSimple;
  screenshot: userScreenShot[];
  review: partyReview[];
}

export interface partyReview {
  author: userSimple;
  text: string;
}

export interface userScreenShot {
  img_src: string;
  author: userSimple;
  comment: string;
}
