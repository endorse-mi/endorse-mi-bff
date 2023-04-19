import { createUser, deleteUser, updateUser } from './mutations';
import { user } from './queries';

export const userResolvers = {
  Query: {
    user,
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
  },
};
