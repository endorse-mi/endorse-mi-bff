import PostInteractionService from '../../../service/post-interaction-service';

const postInteractionService = new PostInteractionService();

export const postInteraction = async (parent: any, { postId, userId }: { postId: string; userId: string }) => {
  console.log(`Getting post interaction for post ${postId} and user ${userId}`);
  return await postInteractionService.getInteraction(postId, userId);
};
