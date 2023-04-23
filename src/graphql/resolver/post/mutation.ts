import { PostCreateRequest } from '../../../dynamodb/model/post-model';
import postService from '../../../service/post-service';
import { requireSameUser } from '../../../utils/authorization';

export const createPost = async (parent, { request }: { request: PostCreateRequest }, context) => {
  console.log(`Creating post for ${request.userId}`);
  try {
    requireSameUser(context.userId, request.userId);
    const post = await postService.createPost(request);
    return {
      post,
      message: `Created post ${request.userId}`,
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
    requireSameUser(context.userId, post.userId);
    await postService.deletePost(id);
    return {
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
