import { Item } from 'dynamoose/dist/Item';

export class PostModel extends Item {
  postId = '';
  userId = '';
  type = '';
  content = '';
  quota = 0;
}

export enum PostType {
  ENDORSE = 'ENDORSE',
  RECOMMEND = 'RECOMMEND',
}

export type PostCreateRequest = {
  userId: string;
  type: PostType;
  content?: string;
};

export type PostDeleteRequest = {
  userId: string;
  postId: string;
};
