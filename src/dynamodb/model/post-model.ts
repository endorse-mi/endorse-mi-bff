import { Item } from 'dynamoose/dist/Item';

export type Post = {
  postId: string;
  userId: string;
  type: PostType;
  content: string;
  maxQuota: number;
  remainingQuota: number;
  nConfirmed: number;
  TTL: number;
};

export class PostModel extends Item {
  postId = '';
  userId = '';
  type = '';
  content = '';
  maxQuota = 0;
  remainingQuota = 0;
  nConfirmed = 0;
  TTL = 0;
}

export enum PostType {
  ENDORSE = 'ENDORSE',
  RECOMMEND = 'RECOMMEND',
}

export type PostCreateRequest = {
  userId: string;
  type: PostType;
  content: string;
};

export type PostDeleteRequest = {
  userId: string;
  postId: string;
};
