import { userSimple } from './user';

export interface post {
  user: userSimple;
  title: string;
  content: string;
  img_src: string;
  created_at: Date;
  tag: string;
  num_likes: number;
  comments: comment[];
  hits: number;
  channel: 'free' | 'guild';
}

export interface comment {
  user: userSimple;
  content: string;
  createdAt: Date;
}
