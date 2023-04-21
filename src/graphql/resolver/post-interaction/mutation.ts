import { PostInteractionUpsertRequest } from '../../../dynamodb/model/post-interaction-model';
import postInteractionService from '../../../service/post-interaction-service';

export const upsertInteraction = async (parent, { request }: { request: PostInteractionUpsertRequest }) => {
  console.log(`Upserting interaction for post ${request.postId} and user ${request.userId}`);
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
