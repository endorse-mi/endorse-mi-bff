import postInteractionService from '../../../service/post-interaction-service';
import postService from '../../../service/post-service';
import { requireDifferentUser, requireSameUser } from '../../../utils/authorization';

export const claimPostInteraction = async (parent, { postId }: { postId: string }, context) => {
  const userId: string = context.userId;
  console.log(`Claiming post ${postId} interaction by user ${userId}`);

  const post = await postService.getPostById(postId);
  if (!post) {
    return {
      message: `The post ${postId} doesn't exist`,
      success: false,
    };
  }

  try {
    requireDifferentUser(userId, post.userId);
    await postInteractionService.claimInteraction(postId, userId);
    return {
      message: `Interaction of post ${postId} has been claimed by ${userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const confirmPostInteraction = async (parent, { postId, userId }: { postId: string; userId: string }, context) => {
  console.log(`Confirming post ${postId} interaction by user ${userId}`);

  const post = await postService.getPostById(postId);
  if (!post) {
    return {
      message: `The post ${postId} doesn't exist`,
      success: false,
    };
  }

  try {
    requireSameUser(context.userId, post.userId);
    await postInteractionService.confirmInteraction(postId, userId);
    return {
      message: `Interaction of post ${postId} from ${userId} has been confirmed by ${post.userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const rejectPostInteraction = async (parent, { postId, userId }: { postId: string; userId: string }, context) => {
  console.log(`Rejecting post ${postId} interaction by user ${userId}`);

  const post = await postService.getPostById(postId);
  if (!post) {
    return {
      message: `The post ${postId} doesn't exist`,
      success: false,
    };
  }

  try {
    requireSameUser(context.userId, post.userId);
    await postInteractionService.rejectInteraction(postId, userId);
    return {
      message: `Interaction of post ${postId} from ${userId} has been rejected`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};
