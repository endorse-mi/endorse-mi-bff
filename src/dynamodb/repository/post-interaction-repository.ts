import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { PostInteractionModel, PostInteractionUpsertRequest } from '../model/post-interaction-model';
import { PostInteractionSchema } from '../schema/post-interaction-schema';

export default class PostInteractionRepository {
  private readonly postInteractionEntity: Model<PostInteractionModel>;

  constructor() {
    this.postInteractionEntity = dynamoose.model<PostInteractionModel>('post-interaction-table-prod', PostInteractionSchema, {
      create: false,
      waitForActive: false,
    });
  }

  getInteractionById = async (postId: string, userId: string) => {
    console.log(postId, userId);
    return await this.postInteractionEntity.get({ postId, userId });
  };

  upsertInteraction = async (request: PostInteractionUpsertRequest) => {
    return await this.postInteractionEntity.create(request);
  };
}
