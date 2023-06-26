import postService from '../service/post-service';
import userService from '../service/user-service';
import logger from '../utils/logger';
import { commonResponseFor } from './utils/common';

export const handler = async (request) => {
  try {
    const type = request.queryStringParameters.type;
    logger.info({ type }, 'Previewing posts');
    const posts = await postService.getPosts(type);
    const postsWithAuthor = await Promise.all(
      posts.map(async (post) => {
        const author = await userService.getUserById(post.authorId);
        return {
          author,
          ...post,
        };
      })
    );
    return commonResponseFor({
      statusCode: 200,
      body: {
        success: true,
        message: 'Preview posts',
        posts: postsWithAuthor,
      },
    });
  } catch (err) {
    return commonResponseFor({
      statusCode: 403,
      body: {
        success: false,
        message: err.message,
      },
    });
  }
};
