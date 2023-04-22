import { ADMIN_USER_ID } from '../../../config';
import { PostInteractionUpsertRequest } from '../../../dynamodb/model/post-interaction-model';
import postInteractionService from '../../../service/post-interaction-service';

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
