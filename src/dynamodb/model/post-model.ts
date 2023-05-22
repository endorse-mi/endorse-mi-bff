import { Item } from 'dynamoose/dist/Item';

export type Post = {
  postId: string;
  authorId: string;
  type: PostType;
  content: string;
  maxQuota: number;
  remainingQuota: number;
  nConfirmed: number;
  TTL: number;
};

export class PostModel extends Item {
  postId: string;
  authorId: string;
  type: string;
  content: string;
  maxQuota: number;
  remainingQuota: number;
  nConfirmed: number;
  TTL: number;
}

export enum PostType {
  ENDORSE = 'ENDORSE',
  RECOMMEND = 'RECOMMEND',
}

export type PostsGetInput = {
  type: PostType;
  startKey?: string;
};

export type PostCreateInput = {
  authorId: string;
  type: PostType;
  content: string;
};

export type PostDeleteInput = {
  authorId: string;
  postId: string;
};
