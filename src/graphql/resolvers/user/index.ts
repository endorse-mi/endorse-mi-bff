import { updateUser } from './mutations';
import { user } from './queries';

export const userResolvers = {
  Query: {
    user,
  },
  Mutation: {
    updateUser,
  },
};
