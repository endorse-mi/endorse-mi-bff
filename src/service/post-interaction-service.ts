import { PostInteractionState, PostInteractionUpsertRequest } from '../dynamodb/model/post-interaction-model';
import PostInteractionRepository from '../dynamodb/repository/post-interaction-repository';

const postInteractionRepository = new PostInteractionRepository();

export const getPostInteraction = async (postId: string, userId: string) => {
  return await postInteractionRepository.getInteractionById(postId, userId);
};

export const upsertInteraction = async (request: PostInteractionUpsertRequest) => {
  const existingInteraction = await postInteractionRepository.getInteractionById(request.postId, request.userId);
  if (
    existingInteraction &&
    existingInteraction.state === PostInteractionState.CLAIMED &&
    request.state === PostInteractionState.CONFIRMED
  ) {
    return await postInteractionRepository.upsertInteraction(request);
  }

  if (!existingInteraction && request.state === PostInteractionState.CLAIMED) {
    return await postInteractionRepository.upsertInteraction(request);
  }
};

export default {
  getPostInteraction,
  upsertInteraction,
};
