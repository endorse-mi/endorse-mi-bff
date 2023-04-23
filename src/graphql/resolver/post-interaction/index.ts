import { claimPostInteraction, confirmPostInteraction, rejectPostInteraction, upsertPostInteraction } from './mutation';
import { postInteraction } from './query';

export const postInteractionResolvers = {
  Query: {
    postInteraction,
  },
  Mutation: {
    upsertPostInteraction,
    claimPostInteraction,
    confirmPostInteraction,
    rejectPostInteraction,
  },
};
