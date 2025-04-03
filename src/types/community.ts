import { communityTags, guildCommunityTags } from './Tags/communityTags';
import { userSimple } from './user';

interface freePost {
  channel: '자유';
  tag: (typeof communityTags)[number];
}
interface guildPost {
  channel: '길드';
  tag: (typeof guildCommunityTags)[number];
}
interface postCore {
  user: userSimple;
  title: string;
  content: string;
  img_src: string;
  created_at: Date;
  num_likes: number;
  comments: comment[];
  hits: number;
}

export type post = postCore & (freePost | guildPost);

export interface comment {
  user: userSimple;
  content: string;
  createdAt: Date;
}
