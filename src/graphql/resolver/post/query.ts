import { getPostById, getPostsByUserId } from '../../../service/post-service';

export const post = async (parent: any, { id }: { id: string }) => {
  console.log('Getting post:', id);
  const post = await getPostById(id);
  return post;
};

export const postsByUserId = async (parent: any, { userId }: { userId: string }) => {
  console.log('getting posts by user id');
  return await getPostsByUserId(userId);
};
