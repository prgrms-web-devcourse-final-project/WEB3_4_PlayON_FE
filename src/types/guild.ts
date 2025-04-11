import { userDetail, userSimple } from './user';
// import { guildTags } from './Tags/guildTags';
import { gameSimple } from './games';

export interface guild {
  guild_id: number;
  guild_name: string; // 길드명
  description: string; // 소개글
  main_game?: gameSimple; // 선택 게임
  img_src: string; // 대표이미지
  num_members: number; // 길드 인원 수
  max_members: number;
  owner: userSimple;
  created_at: Date;
  myRole: string;
  play_style: string[];
  skill_level: string[];
  gender: string[];
  friendly: string[];
}

export interface guildUser {
  user: userDetail;
  guild_role: string;
  joined_at: Date;
  num_guild_posts: number;
}

export interface guildUserSimple {
  username: string;
  title: string | null;
  role: string;
  img_src: string;
  member_id: number;
  joined_at: Date;
}
