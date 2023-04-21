import { PostCreateRequest } from '../dynamodb/model/post-model';
import PostRepository from '../dynamodb/repository/post-repository';

const postRepository = new PostRepository();

export const getPostById = async (id: string) => {
  return await postRepository.getPostById(id);
};

export const createPost = async (request: PostCreateRequest) => {
  return await postRepository.createPost(request);
};

export const deletePost = async (id: string) => {
  await postRepository.deletePost(id);
};

export default {
  getPostById,
  createPost,
  deletePost,
};
