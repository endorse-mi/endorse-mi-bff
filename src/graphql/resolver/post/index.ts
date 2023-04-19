import { createPost, deletePost } from './mutation';
import { post } from './query';

export const postResolvers = {
  Query: {
    post,
  },
  Mutation: {
    createPost,
    deletePost,
  },
};
