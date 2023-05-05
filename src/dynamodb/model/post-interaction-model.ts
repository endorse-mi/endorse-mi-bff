import { Item } from 'dynamoose/dist/Item';

export type PostInteraction = {
  postId: string;
  fulfillerId: string;
  state: PostInteractionState;
};

export class PostInteractionModel extends Item {
  postId: string;
  fulfillerId: string;
  state: string;
}

export enum PostInteractionState {
  CLAIMED = 'CLAIMED',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

export type PostInteractionUpsertRequest = {
  postId: string;
  fulfillerId: string;
  state: PostInteractionState;
};
