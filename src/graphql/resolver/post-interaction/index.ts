import { claimPostInteraction, confirmPostInteraction, rejectPostInteraction } from './mutation';
import { postInteraction } from './query';

export const postInteractionResolvers = {
  Query: {
    postInteraction,
  },
  Mutation: {
    claimPostInteraction,
    confirmPostInteraction,
    rejectPostInteraction,
  },
};
