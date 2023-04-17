import { post, postsByUserId } from './queries';

export const postResolvers = {
  Query: {
    post,
    postsByUserId,
  },
};
