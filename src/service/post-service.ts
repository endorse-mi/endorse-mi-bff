import { v4 as uuidv4 } from 'uuid';
import { PostCreateRequest, PostType } from '../dynamodb/model/post-model';
import PostRepository from '../dynamodb/repository/post-repository';
import balanceService, { COST_PER_ENDORSEMENT_POST, COST_PER_RECOMMENDATION_POST } from './balance-service';

const ENDORSEMENT_QUOTA = 3;
const RECOMMENDATION_QUOTA = 1;

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
  const post = toPost(request);
  return await postRepository.createPost(post);
};

export const deletePost = async (id: string) => {
  await postRepository.deletePost(id);
};

const toPost = (request: PostCreateRequest) => {
  const quota = request.type === PostType.ENDORSE ? ENDORSEMENT_QUOTA : RECOMMENDATION_QUOTA;
  return { ...request, postId: uuidv4(), maxQuota: quota, remainingQuota: quota };
};

export default {
  getPostById,
  createPost,
  deletePost,
};
