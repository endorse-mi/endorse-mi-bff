import postInteractionService from '../../../service/post-interaction-service';
import logger from '../../../utils/logger';

export const postInteraction = async (parent: any, { postId, userId }: { postId: string; userId: string }) => {
  logger.info({ postId, userId }, 'Start postInteraction resolver');
  return await postInteractionService.getInteraction(postId, userId);
};

export const postInteractionsByPostId = async (parent: any, { postId }: { postId: string }) => {
  logger.info({ postId }, 'Start postInteractionsByPostId resolver');
  return await postInteractionService.getInteractionsByPostId(postId);
};
