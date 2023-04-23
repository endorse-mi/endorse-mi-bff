import { PostInteractionState, PostInteractionUpsertRequest } from '../dynamodb/model/post-interaction-model';
import { PostType } from '../dynamodb/model/post-model';
import PostInteractionRepository from '../dynamodb/repository/post-interaction-repository';
import PostRepository from '../dynamodb/repository/post-repository';
import BalanceService from './balance-service';

export default class PostInteractionService {
  private readonly postInteractionRepository = new PostInteractionRepository();
  private readonly postRepository = new PostRepository();
  private readonly balanceService = new BalanceService();

  getInteraction = async (postId: string, userId: string) => {
    return await this.postInteractionRepository.getInteractionById(postId, userId);
  };

  upsertInteraction = async (request: PostInteractionUpsertRequest) => {
    const existingInteraction = await this.postInteractionRepository.getInteractionById(request.postId, request.userId);
    if (
      existingInteraction &&
      existingInteraction.state === PostInteractionState.CLAIMED &&
      request.state === PostInteractionState.CONFIRMED
    ) {
      return await this.postInteractionRepository.updateInteraction(request);
    }

    if (!existingInteraction && request.state === PostInteractionState.CLAIMED) {
      return await this.postInteractionRepository.createInteraction(request);
    }

    throw new Error('Unable to upsert interaction');
  };

  claimInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await this.postInteractionRepository.getInteractionById(postId, userId);
    if (existingInteraction) {
      return new Error(`The user ${userId} has already claimed`);
    }

    const post = await this.postRepository.getPostById(postId);
    await this.postRepository.setRemainingQuota(postId, post.remainingQuota - 1);
    return await this.postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.CLAIMED });
  };

  confirmInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await this.postInteractionRepository.getInteractionById(postId, userId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      return new Error(`The user ${userId} can't be confirmed`);
    }

    const post = await this.postRepository.getPostById(postId);
    await this.balanceService.rewardPost(userId, post.type as PostType);
    return await this.postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.CONFIRMED });
  };

  rejectInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await this.postInteractionRepository.getInteractionById(postId, userId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      return new Error(`The user ${userId} can't be rejected`);
    }

    const post = await this.postRepository.getPostById(postId);
    await this.postRepository.setRemainingQuota(postId, post.remainingQuota + 1);
    return await this.postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.REJECTED });
  };
}
