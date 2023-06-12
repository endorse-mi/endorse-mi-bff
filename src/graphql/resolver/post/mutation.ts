import { PostCreateInput } from '../../../dynamodb/model/post-model';
import postService from '../../../service/post-service';
import { requireSameUser } from '../../../utils/authorization';

export const createPost = async (parent, { input }: { input: PostCreateInput }, context) => {
  console.log(`Creating post for ${context.userId}`);
  try {
    input.authorId = context.userId;
    const post = await postService.createPost(input);
    return {
      post,
      message: 'New post created',
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

    requireSameUser(context.userId, post.authorId);
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
