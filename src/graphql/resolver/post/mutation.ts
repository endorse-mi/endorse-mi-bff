import { PostCreateRequest } from '../../../dynamodb/model/post-model';
import PostService from '../../../service/post-service';

const postService = new PostService();

export const createPost = async (parent, { request }: { request: PostCreateRequest }, context) => {
  console.log(`Creating post for ${request.userId}`);
  if (context.userId !== request.userId) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
      success: false,
    };
  }

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

export const deletePost = async (parent, { id }: { id: string }, context) => {
  console.log(`Deleting post ${id}`);

  const post = await postService.getPostById(id);
  if (context.userId !== post.userId) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
      success: false,
    };
  }

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
