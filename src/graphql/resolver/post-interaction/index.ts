import { upsertInteraction } from './mutation';
import { postInteraction } from './query';

export const postInteractionResolvers = {
  Query: {
    postInteraction,
  },
  Mutation: {
    upsertInteraction,
  },
};
