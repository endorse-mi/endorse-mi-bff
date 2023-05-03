import { PostInteractionState } from '../dynamodb/model/post-interaction-model';
import { PostType } from '../dynamodb/model/post-model';
import postInteractionRepository from '../dynamodb/repository/post-interaction-repository';
import postRepository from '../dynamodb/repository/post-repository';
import balanceService from './balance-service';

class PostInteractionService {
  getInteraction = async (postId: string, userId: string) => {
    return await postInteractionRepository.getInteractionById(postId, userId);
  };

  getInteractionsByPostId = async (postId: string) => {
    return await postInteractionRepository.getInteractionsByPostId(postId);
  };

  claimInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, userId);
    if (existingInteraction) {
      throw new Error(`The user ${userId} has already claimed`);
    }

    const post = await postRepository.getPostById(postId);
    await postRepository.setRemainingQuota(postId, post.remainingQuota - 1);
    await postInteractionRepository.createInteraction({ postId, userId, state: PostInteractionState.CLAIMED });
  };

  confirmInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, userId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      throw new Error(`The user ${userId} can't be confirmed`);
    }

    const post = await postRepository.getPostById(postId);
    const nConfirmed = post.nConfirmed + 1;
    await postRepository.setNConfirmed(postId, nConfirmed);
    await balanceService.rewardPost(userId, post.type as PostType);
    await postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.CONFIRMED });

    if (nConfirmed >= post.maxQuota) {
      await postRepository.deletePost(post.postId);
      await postInteractionRepository.deleteInteractionsByPostId(post.postId);
    }
  };

  rejectInteraction = async (postId: string, userId: string) => {
    const existingInteraction = await postInteractionRepository.getInteractionById(postId, userId);
    if ((existingInteraction && existingInteraction.state !== PostInteractionState.CLAIMED) || !existingInteraction) {
      throw new Error(`The user ${userId} can't be rejected`);
    }

    const post = await postRepository.getPostById(postId);
    await postRepository.setRemainingQuota(postId, post.remainingQuota + 1);
    await postInteractionRepository.updateInteraction({ postId, userId, state: PostInteractionState.REJECTED });
  };
}

export default new PostInteractionService();
