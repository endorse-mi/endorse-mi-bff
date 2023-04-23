import PostService from '../../../service/post-service';

const postService = new PostService();

export const post = async (parent: any, { id }: { id: string }) => {
  console.log('Getting post:', id);
  const post = await postService.getPostById(id);
  return post;
};

export const postsByUserId = async (parent: any, { userId }: { userId: string }) => {
  console.log('getting posts by user id');
  return await postService.getPostsByUserId(userId);
};
