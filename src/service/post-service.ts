import { v4 as uuidv4 } from 'uuid';
import { PostCreateRequest, PostType } from '../dynamodb/model/post-model';
import PostRepository from '../dynamodb/repository/post-repository';
import BalanceService from './balance-service';

const ENDORSEMENT_POST_QUOTA = 3;
const RECOMMENDATION_POST_QUOTA = 1;

export default class PostService {
  private readonly postRepository = new PostRepository();
  private readonly balanceService = new BalanceService();

  getPostById = async (id: string) => {
    return await this.postRepository.getPostById(id);
  };

  getPostsByUserId = async (userId: string) => {
    return await this.postRepository.getPostsByUserId(userId);
  };

  createPost = async (request: PostCreateRequest) => {
    await this.balanceService.purchasePost(request.userId, request.type);
    const post = this.toPost(request);
    return await this.postRepository.createPost(post);
  };

  deletePost = async (id: string) => {
    await this.postRepository.deletePost(id);
  };

  private readonly toPost = (request: PostCreateRequest) => {
    const quota = request.type === PostType.ENDORSE ? ENDORSEMENT_POST_QUOTA : RECOMMENDATION_POST_QUOTA;
    return { ...request, postId: uuidv4(), maxQuota: quota, remainingQuota: quota };
  };
}
