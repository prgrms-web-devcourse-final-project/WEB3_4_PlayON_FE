import { userDetail, userSimple } from './user';
import { guildTags } from './Tags/guildTags';
import { gameSimple } from './games';

export interface guild {
  guild_name: string; // 길드명
  description: string; // 소개글
  main_game?: gameSimple; // 선택 게임
  img_src: string; // 대표이미지
  num_members: number; // 길드 인원 수
  owner: userSimple;
  created_at: Date;
  play_style: (typeof guildTags.partyStyle.items)[number][];
  skill_level: (typeof guildTags.skillLevel.items)[number][];
  gender: (typeof guildTags.gender.items)[number][];
  friendly: (typeof guildTags.friendly.items)[number][];
}

export interface guildUser {
  user: userDetail;
  guild_role: string;
  joined_at: Date;
  num_guild_posts: number;
}
