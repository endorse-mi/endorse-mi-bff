import { getPost, getPostsByUserId } from '../../../services/post';

interface PostsByIdRequest {
  userId: string;
}

export const post = async (parent: any) => {
  console.log('Received getPost request!');
  const post = await getPost();
  console.log(post);
  return post;
};

export const postsByUserId = async (parent: any, request: PostsByIdRequest) => {
  console.log('getting posts by user id');
  await getPostsByUserId(request.userId);
};
