import postInteractionService from '../../../service/post-interaction-service';
import postService from '../../../service/post-service';
import { requireDifferentUser, requireSameUser } from '../../../utils/authorization';
import logger from '../../../utils/logger';

export const claimPostInteraction = async (parent, { postId }: { postId: string }, context) => {
  logger.info({ postId, fulfiller: context.userId }, 'Start claimPostInteraction resolver');
  const fulfiller: string = context.userId;
  console.log(`Claiming post ${postId} interaction by user ${fulfiller}`);

  const post = await postService.getPostById(postId);
  if (!post) {
    return {
      message: `The post ${postId} doesn't exist`,
      success: false,
    };
  }

  try {
    requireDifferentUser(fulfiller, post.authorId);
    await postInteractionService.claimInteraction(postId, fulfiller);
    return {
      message: `Interaction of post ${postId} has been claimed by ${fulfiller}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const confirmPostInteraction = async (parent, { postId, fulfillerId }: { postId: string; fulfillerId: string }, context) => {
  logger.info({ postId, fulfillerId }, 'Start confirmPostInteraction resolver');

  const post = await postService.getPostById(postId);
  if (!post) {
    return {
      message: `The post ${postId} doesn't exist`,
      success: false,
    };
  }

  try {
    requireSameUser(context.userId, post.authorId);
    await postInteractionService.confirmInteraction(postId, fulfillerId);
    return {
      message: `Interaction of post ${postId} from ${fulfillerId} has been confirmed by ${post.authorId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const rejectPostInteraction = async (parent, { postId, fulfillerId }: { postId: string; fulfillerId: string }, context) => {
  logger.info({ postId, fulfillerId }, 'Start rejectPostInteraction resolver');

  const post = await postService.getPostById(postId);
  if (!post) {
    return {
      message: `The post ${postId} doesn't exist`,
      success: false,
    };
  }

  try {
    requireSameUser(context.userId, post.authorId);
    await postInteractionService.rejectInteraction(postId, fulfillerId);
    return {
      message: `Interaction of post ${postId} from ${fulfillerId} has been rejected`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};
