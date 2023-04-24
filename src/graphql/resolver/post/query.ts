import postService from '../../../service/post-service';
import userService from '../../../service/user-service';
import logger from '../../../utils/logger';

export const posts = async (parent: any, { startKey }: { startKey?: string }) => {
  logger.info({ startKey }, 'Getting posts');
  const posts = await postService.getPosts(startKey);
  return posts;
};

export const post = async (parent: any, { id }: { id: string }) => {
  logger.info({ postId: id }, 'Getting post');
  const post = await postService.getPostById(id);
  return post;
};

export const postsByUserId = async (parent: any, { userId }: { userId: string }) => {
  logger.info({ userId }, 'Getting posts');
  return await postService.getPostsByUserId(userId);
};

export const author = async (parent: any) => {
  logger.info({ parent }, 'Getting author');
  return userService.getUserById(parent.userId);
};
