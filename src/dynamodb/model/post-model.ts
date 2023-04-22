import { Item } from 'dynamoose/dist/Item';

export class PostModel extends Item {
  postId = '';
  userId = '';
  type = '';
  skill = '';
  quota = 0;
}

export enum PostType {
  ENDORSE = 'ENDORSE',
  RECOMMEND = 'RECOMMEND',
}

export type PostCreateRequest = {
  userId: string;
  type: PostType;
  skill?: string;
};

export type PostDeleteRequest = {
  userId: string;
  postId: string;
};
