import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { v4 as uuidv4 } from 'uuid';
import { PostCreateRequest, PostType } from '../dynamodb/model/post-model';
import postRepository from '../dynamodb/repository/post-repository';
import logger from '../utils/logger';
import balanceService from './balance-service';

dayjs.extend(utc);

const ENDORSEMENT_POST_QUOTA = 3;
const RECOMMENDATION_POST_QUOTA = 1;

class PostService {
  getPosts = async (startKey?: string) => {
    return await postRepository.getPosts(startKey);
  };

  getPostById = async (id: string) => {
    logger.debug({ id }, 'PostService -> getPostById');
    return await postRepository.getPostById(id);
  };

  getPostsByUserId = async (userId: string) => {
    return await postRepository.getPostsByUserId(userId);
  };

  createPost = async (request: PostCreateRequest) => {
    await balanceService.purchasePost(request.userId, request.type);
    const post = this.toPost(request);
    return await postRepository.createPost(post);
  };

  deletePost = async (id: string) => {
    await postRepository.deletePost(id);
  };

  private readonly toPost = (request: PostCreateRequest) => {
    const quota = request.type === PostType.ENDORSE ? ENDORSEMENT_POST_QUOTA : RECOMMENDATION_POST_QUOTA;
    return {
      ...request,
      postId: uuidv4(),
      maxQuota: quota,
      remainingQuota: quota,
      nConfirmed: 0,
      TTL: dayjs().add(3, 'day').toDate().getTime() / 1000,
    };
  };
}

export default new PostService();
