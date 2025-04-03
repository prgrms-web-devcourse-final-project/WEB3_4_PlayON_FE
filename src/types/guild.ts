import { userDetail, userSimple } from './user';

export interface guild {
  guild_name: string; // 길드명
  description: string; // 소개글
  main_game?: string; // 선택 게임
  guildTags: string[]; // 길드 태그
  img_src: string; // 대표이미지
  num_members: number; // 길드 인원 수
  owner: userSimple;
  created_at: Date;
}

export type guildUser = userDetail | guildUserData;

export type guildUserData = {
  guild_role: string;
  joined_at: Date;
  num_guild_posts: number;
};
