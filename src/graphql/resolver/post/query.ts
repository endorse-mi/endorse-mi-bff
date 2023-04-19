import { getPostById } from '../../../dynamodb/service/post-service';

export const post = async (parent: any, { id }: { id: string }) => {
  console.log('Getting post:', id);
  const post = await getPostById(id);
  return post;
};

// export const postsByUserId = async (parent: any, request: PostsByIdRequest) => {
//   console.log('getting posts by user id');
//   await getPostsByUserId(request.userId);
// };
