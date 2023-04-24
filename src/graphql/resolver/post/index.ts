import { createPost, deletePost } from './mutation';
import { author, post, posts, postsByUserId } from './query';

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
  Post: {
    author,
  },
};
