import { Item } from 'dynamoose/dist/Item';

export class PostInteractionModel extends Item {
  postId = '';
  userId = '';
  state = '';
}

export type PostInteractionRequest = {
  postId: string;
  type: string; // CLAIM, CONFIRM, REJECT
};
