export interface userSimple {
  username: string;
  nickname: string;
  user_title: string;
  profile_src: string;
}

export interface userDetail {
  nickname: string;
  img_src: string;
  gender: string;
  title: string;
  last_login_at: Date;
  steam_id: string;
  play_style: string[];
}
