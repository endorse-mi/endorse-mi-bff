import { createPost, deletePost } from './mutation';
import { post, postsByUserId } from './query';

export const postResolvers = {
  Query: {
    post,
    postsByUserId,
  },
  Mutation: {
    createPost,
    deletePost,
  },
};
