import { userSimple } from './user';

export interface post {
  user: userSimple;
  title: string;
  content: string;
  img_src: string;
  createdAt: Date;
  tag: string;
  numLikes: number;
  comments: comment[];
  hits: number;
  channel: 'free' | 'guild';
}

export interface comment {
  user: userSimple;
  content: string;
  createdAt: Date;
}
