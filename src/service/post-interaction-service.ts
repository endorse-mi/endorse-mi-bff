import { PostInteractionState } from '../dynamodb/model/post-interaction-model';
import { PostType } from '../dynamodb/model/post-model';
import postInteractionRepository from '../dynamodb/repository/post-interaction-repository';
import postRepository from '../dynamodb/repository/post-repository';
import logger from '../utils/logger';
import balanceService from './balance-service';

class PostInteractionService {
  getInteraction = async (postId: string, fulfillerId: string) => {
    logger.debug({ postId, fulfillerId }, 'PostInteractionService -> getInteraction');
    return await postInteractionRepository.getInteractionById(postId, fulfillerId);
  };

  getInteractionsByPostId = async (postId: string) => {
    logger.debug({ postId }, 'PostInteractionService -> getInteractionsByPostId');
    return await postInteractionRepository.getInteractionsByPostId(postId);
  };

  claimInteraction = async (postId: string, fulfillerId: string) => {
    logger.debug({ postId, fulfillerId }, 'PostInteractionService -> claimInteraction');
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, fulfillerId);
    if (existingInteraction) {
      throw new Error(`The user ${fulfillerId} has already claimed`);
    }

    const post = await postRepository.getPostById(postId);
    await postRepository.setRemainingQuota(postId, post.remainingQuota - 1);
    await postInteractionRepository.createInteraction({ postId, fulfillerId, state: PostInteractionState.CLAIMED });
  };

  confirmInteraction = async (postId: string, fulfillerId: string) => {
    logger.debug({ postId, fulfillerId }, 'PostInteractionService -> confirmInteraction');
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, fulfillerId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      throw new Error(`The user ${fulfillerId} can't be confirmed`);
    }

    const post = await postRepository.getPostById(postId);
    const nConfirmed = post.nConfirmed + 1;
    await postRepository.setNConfirmed(postId, nConfirmed);
    await balanceService.rewardPost(fulfillerId, post.type as PostType);
    await postInteractionRepository.updateInteraction({ postId, fulfillerId, state: PostInteractionState.CONFIRMED });

    if (nConfirmed >= post.maxQuota) {
      await postRepository.deletePost(post.postId);
      await postInteractionRepository.deleteInteractionsByPostId(post.postId);
    }
  };

  rejectInteraction = async (postId: string, fulfillerId: string) => {
    logger.debug({ postId, fulfillerId }, 'PostInteractionService -> rejectInteraction');
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, fulfillerId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      throw new Error(`The user ${fulfillerId} can't be rejected`);
    }

    const post = await postRepository.getPostById(postId);
    await postRepository.setRemainingQuota(postId, post.remainingQuota + 1);
    await postInteractionRepository.updateInteraction({ postId, fulfillerId, state: PostInteractionState.REJECTED });
  };
}

export default new PostInteractionService();
