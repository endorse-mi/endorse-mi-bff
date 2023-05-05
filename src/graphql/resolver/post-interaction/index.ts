import { claimPostInteraction, confirmPostInteraction, rejectPostInteraction } from './mutation';
import { fulfiller, postInteraction, postInteractionsByPostId } from './query';

export const postInteractionResolvers = {
  Query: {
    postInteraction,
    postInteractionsByPostId,
  },
  Mutation: {
    claimPostInteraction,
    confirmPostInteraction,
    rejectPostInteraction,
  },
  PostInteraction: {
    fulfiller,
  },
};
