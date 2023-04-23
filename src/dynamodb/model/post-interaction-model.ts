import { Item } from 'dynamoose/dist/Item';

export type PostInteraction = {
  postId: string;
  userId: string;
  authorId: string;
  state: PostInteractionState;
};

export class PostInteractionModel extends Item {
  postId: string;
  userId: string;
  authorId: string;
  state: string;
}

export enum PostInteractionState {
  CLAIMED = 'CLAIMED',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

export type PostInteractionUpsertRequest = {
  postId: string;
  userId: string;
  state: PostInteractionState;
};
