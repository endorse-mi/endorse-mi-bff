import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { PostInteraction, PostInteractionModel } from '../model/post-interaction-model';
import { PostInteractionSchema } from '../schema/post-interaction-schema';

class PostInteractionRepository {
  private readonly postInteractionEntity: Model<PostInteractionModel>;

  constructor() {
    this.postInteractionEntity = dynamoose.model<PostInteractionModel>('post-interaction-table-prod', PostInteractionSchema, {
      create: false,
      waitForActive: false,
    });
  }

  getInteractionById = async (postId: string, userId: string) => {
    return await this.postInteractionEntity.get({ postId, userId });
  };

  getInteractionsByPostId = async (postId: string) => {
    return await this.postInteractionEntity.get({ postId });
  };

  createInteraction = async (request: PostInteraction) => {
    return await this.postInteractionEntity.create(request);
  };

  updateInteraction = async (request: PostInteraction) => {
    return await this.postInteractionEntity.update(request);
  };

  deleteInteractionsByPostId = async (postId: string) => {
    const interactions = await this.postInteractionEntity.query('postId').eq(postId).exec();
    const interactionKeys = interactions.map((interaction) => ({ postId: interaction.postId, userId: interaction.userId }));
    await this.postInteractionEntity.batchDelete(interactionKeys);
  };
}

export default new PostInteractionRepository();
