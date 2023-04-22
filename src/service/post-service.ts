import { PostCreateRequest, PostType } from '../dynamodb/model/post-model';
import PostRepository from '../dynamodb/repository/post-repository';
import balanceService, { COST_PER_ENDORSEMENT_POST, COST_PER_RECOMMENDATION_POST } from './balance-service';

const postRepository = new PostRepository();

export const getPostById = async (id: string) => {
  return await postRepository.getPostById(id);
};

export const getPostsByUserId = async (userId: string) => {
  return await postRepository.getPostsByUserId(userId);
};

export const createPost = async (request: PostCreateRequest) => {
  const postCost = request.type === PostType.ENDORSE ? COST_PER_ENDORSEMENT_POST : COST_PER_RECOMMENDATION_POST;
  await balanceService.changeUserBalance(request.userId, postCost);
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
