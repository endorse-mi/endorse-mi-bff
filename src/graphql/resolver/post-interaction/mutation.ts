import postInteractionService from '../../../service/post-interaction-service';
import postService from '../../../service/post-service';

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

  if (userId === post.userId) {
    return {
      message: `The user ${userId} is not authenticated to access this resource`,
      success: false,
    };
  }

  try {
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

  if (context.userId !== post.userId) {
    return {
      message: `The user ${userId} is not authenticated to access this resource`,
      success: false,
    };
  }

  try {
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

  if (context.userId !== post.userId) {
    return {
      message: `The user ${userId} is not authenticated to access this resource`,
      success: false,
    };
  }

  try {
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
