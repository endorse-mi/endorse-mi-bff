import { PostCreateRequest } from '../../../dynamodb/model/post-model';
import postService from '../../../service/post-service';
import { requireSameUser } from '../../../utils/authorization';

export const createPost = async (parent, { request }: { request: PostCreateRequest }, context) => {
  console.log(`Creating post for ${context.userId}`);
  try {
    request.userId = context.userId;
    const post = await postService.createPost(request);
    return {
      post,
      message: `Created post ${context.userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const deletePost = async (parent, { id }: { id: string }, context) => {
  console.log(`Deleting post ${id}`);
  try {
    const post = await postService.getPostById(id);
    if (!post) {
      throw new Error(`Post ${id} doesn't exist`);
    }

    requireSameUser(context.userId, post.userId);
    await postService.deletePost(id);
    return {
      post,
      message: `Deleted post ${id}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};
