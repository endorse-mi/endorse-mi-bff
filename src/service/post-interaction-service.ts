import { PostInteractionState, PostInteractionUpsertRequest } from '../dynamodb/model/post-interaction-model';
import { PostType } from '../dynamodb/model/post-model';
import postInteractionRepository from '../dynamodb/repository/post-interaction-repository';
import postRepository from '../dynamodb/repository/post-repository';
import balanceService from './balance-service';

class PostInteractionService {
  getInteraction = async (postId: string, userId: string) => {
    return await postInteractionRepository.getInteractionById(postId, userId);
  };

  upsertInteraction = async (request: PostInteractionUpsertRequest) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(request.postId, request.userId);
    if (
      existingInteraction &&
      existingInteraction.state === PostInteractionState.CLAIMED &&
      request.state === PostInteractionState.CONFIRMED
    ) {
      return await postInteractionRepository.updateInteraction(request);
    }

    if (!existingInteraction && request.state === PostInteractionState.CLAIMED) {
      return await postInteractionRepository.createInteraction(request);
    }

    throw new Error('Unable to upsert interaction');
  };

  claimInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, userId);
    if (existingInteraction) {
      return new Error(`The user ${userId} has already claimed`);
    }

    const post = await postRepository.getPostById(postId);
    await postRepository.setRemainingQuota(postId, post.remainingQuota - 1);
    return await postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.CLAIMED });
  };

  confirmInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, userId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      return new Error(`The user ${userId} can't be confirmed`);
    }

    const post = await postRepository.getPostById(postId);
    await balanceService.rewardPost(userId, post.type as PostType);
    return await postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.CONFIRMED });
  };

  rejectInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, userId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      return new Error(`The user ${userId} can't be rejected`);
    }

    const post = await postRepository.getPostById(postId);
    await postRepository.setRemainingQuota(postId, post.remainingQuota + 1);
    return await postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.REJECTED });
  };
}

export default new PostInteractionService();
