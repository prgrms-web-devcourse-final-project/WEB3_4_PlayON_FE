import { userCategories } from './Tags/userCategories';

export interface userSimple {
  username: string;
  nickname: string;
  user_title: string;
  img_src: string;
  memberId: string;
}

export interface userDetail {
  username: string;
  nickname: string;
  user_title: string;
  img_src: string | null;
  last_login_at: Date;
  steam_id: string;
  gender: (typeof userCategories.gender.items)[number];
  party_style: (typeof userCategories.playStyle.items)[number];
  skill_level: (typeof userCategories.skillLevel.items)[number];
}
