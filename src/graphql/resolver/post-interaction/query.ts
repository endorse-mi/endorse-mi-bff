import postInteractionService from '../../../service/post-interaction-service';
import userService from '../../../service/user-service';
import logger from '../../../utils/logger';

export const postInteraction = async (parent: any, { postId, fulfillerId }: { postId: string; fulfillerId: string }) => {
  logger.info({ postId, fulfillerId }, 'Start postInteraction resolver');
  return await postInteractionService.getInteraction(postId, fulfillerId);
};

export const postInteractionsByPostId = async (parent: any, { postId }: { postId: string }) => {
  logger.info({ postId }, 'Start postInteractionsByPostId resolver');
  return await postInteractionService.getInteractionsByPostId(postId);
};

export const fulfiller = async (parent: any) => {
  logger.info({ parent }, 'Getting fulfiller');
  return userService.getUserById(parent.fulfillerId);
};
