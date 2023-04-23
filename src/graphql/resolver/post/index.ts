import { createPost, deletePost } from './mutation';
import { post, posts, postsByUserId } from './query';

export const postResolvers = {
  Query: {
    posts,
    post,
    postsByUserId,
  },
  Mutation: {
    createPost,
    deletePost,
  },
};
