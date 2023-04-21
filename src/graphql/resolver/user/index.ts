import { createUser, deleteUser, updateUser } from './mutation';
import { user } from './query';

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
