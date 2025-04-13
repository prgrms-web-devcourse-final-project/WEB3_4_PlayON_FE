import { communityTags, guildCommunityTags } from './Tags/communityTags';
import { userSimple } from './user';

interface freePost {
  channel: '자유';
  tag: (typeof communityTags)[number];
}
interface guildPost {
  channel: '길드';
  tag: string;
}
interface postCore {
  user: userSimple;
  title: string;
  content: string;
  img_src: string;
  created_at: Date;
  num_likes: number;
  comments: comment[];
  num_comments: number;
  hits: number;
}

export type post = postCore & (freePost | guildPost);

export interface comment {
  user: userSimple;
  content: string;
  createdAt: Date;
  commentId: number;
  isAuthor: boolean;
}

export interface postSimple {
  postId: number;
  author_nickname: string;
  author_img: string;
  title: string;
  content: string;
  img_src: string;
  num_likes: number;
  comments_num: number;
  tag: string;
}
