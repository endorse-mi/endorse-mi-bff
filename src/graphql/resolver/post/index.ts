import { createPost, deletePost } from './mutation';
import { author, post, posts, postsByAuthorId } from './query';

export const postResolvers = {
  Query: {
    posts,
    post,
    postsByAuthorId,
  },
  Mutation: {
    createPost,
    deletePost,
  },
  Post: {
    author,
  },
};
