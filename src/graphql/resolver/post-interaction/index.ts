import { claimPostInteraction, confirmPostInteraction, rejectPostInteraction } from './mutation';
import { postInteraction, postInteractionsByPostId } from './query';

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
};
