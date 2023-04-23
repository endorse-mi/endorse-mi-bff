import { ADMIN_USER_ID } from '../../../config';
import { PostInteractionUpsertRequest } from '../../../dynamodb/model/post-interaction-model';
import postInteractionService from '../../../service/post-interaction-service';
import postService from '../../../service/post-service';

export const upsertPostInteraction = async (parent, { request }: { request: PostInteractionUpsertRequest }, context) => {
  console.log(`Upserting interaction for post ${request.postId} and user ${request.userId}`);
  if (context.userId !== ADMIN_USER_ID) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
      success: false,
    };
  }

  try {
    await postInteractionService.upsertInteraction(request);
    return {
      message: `Upserted interaction for post ${request.postId} and user ${request.userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const claimPostInteraction = async (parent, { postId, userId }: { postId: string; userId: string }, context) => {
  console.log(`Claiming post ${postId} interaction by user ${userId}`);

  const post = await postService.getPostById(postId);
  if (context.userId === post.userId) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
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
  console.log(`Claiming post ${postId} interaction by user ${userId}`);

  const post = await postService.getPostById(postId);
  if (context.userId !== post.userId) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
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
  console.log(`Claiming post ${postId} interaction by user ${userId}`);

  const post = await postService.getPostById(postId);
  if (context.userId !== post.userId) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
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
