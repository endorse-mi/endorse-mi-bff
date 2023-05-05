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

export const postsByAuthorId = async (parent: any, { authorId }: { authorId: string }) => {
  logger.info({ authorId }, 'Getting posts');
  return await postService.getPostsByAuthorId(authorId);
};

export const author = async (parent: any) => {
  logger.info({ parent }, 'Getting author');
  return userService.getUserById(parent.authorId);
};
