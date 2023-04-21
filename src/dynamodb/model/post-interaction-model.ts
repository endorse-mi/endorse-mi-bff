import { Item } from 'dynamoose/dist/Item';

export class PostInteractionModel extends Item {
  postId = '';
  userId = '';
  state? = '';
}

export enum PostInteractionState {
  CLAIMED = 'CLAIMED',
  CONFIRMED = 'CONFIRMED',
}

export type PostInteractionUpsertRequest = {
  postId: string;
  userId: string;
  state: PostInteractionState;
};
