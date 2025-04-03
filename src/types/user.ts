export interface userSimple {
  username: string;
  nickname: string;
  user_title: string;
  img_src: string;
}

export interface userDetail {
  username: string;
  nickname: string;
  user_title: string;
  img_src: string;
  gender: string;
  last_login_at: Date;
  steam_id: string;
  play_style: string[];
}
