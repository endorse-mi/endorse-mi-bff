import postInteractionService from '../../../service/post-interaction-service';

export const postInteraction = async (parent: any, { postId, userId }: { postId: string; userId: string }) => {
  console.log(`Getting post interaction for post ${postId} and user ${userId}`);
  return await postInteractionService.getPostInteraction(postId, userId);
};
