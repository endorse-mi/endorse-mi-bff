import { Item } from 'dynamoose/dist/Item';

export class PostModel extends Item {
  postId = '';
  userId = '';
  type = '';
  skill = '';
  quota = 0;
}

export type PostCreateRequest = {
  userId: string;
  type: string;
  skill?: string;
};

export type PostDeleteRequest = {
  userId: string;
  postId: string;
};
