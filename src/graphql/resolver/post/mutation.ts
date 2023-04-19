import { PostCreateRequest } from '../../../dynamodb/model/post-model';
import postService from '../../../dynamodb/service/post-service';

export const createPost = async (parent, { request }: { request: PostCreateRequest }) => {
  console.log(`Creating post for ${request.userId}`);
  try {
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

export const deletePost = async (parent, { id }: { id: string }) => {
  console.log(`Deleting post ${id}`);
  try {
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
