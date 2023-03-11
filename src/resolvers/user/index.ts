import { signUp } from './mutations';
import { user } from './queries';

export const userResolvers = {
  Query: {
    user,
  },
  Mutation: {
    signUp,
  },
};
