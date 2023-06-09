import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { ENVIRONMENT } from '../../environments';
import logger from '../../utils/logger';
import { PostInteraction, PostInteractionModel } from '../model/post-interaction-model';
import { PostInteractionSchema } from '../schema/post-interaction-schema';

class PostInteractionRepository {
  private readonly postInteractionEntity: Model<PostInteractionModel>;

  constructor() {
    this.postInteractionEntity = dynamoose.model<PostInteractionModel>(`post-interaction-table-${ENVIRONMENT}`, PostInteractionSchema, {
      create: false,
      waitForActive: false,
    });
  }

  getInteractionById = async (postId: string, fulfillerId: string) => {
    logger.debug({ postId, fulfillerId }, 'PostInteractionRepository -> getInteractionById');
    return await this.postInteractionEntity.get({ postId, fulfillerId });
  };

  getInteractionsByPostId = async (postId: string) => {
    logger.debug({ postId }, 'PostInteractionRepository -> getInteractionsByPostId');
    return await this.postInteractionEntity.query('postId').eq(postId).exec();
  };

  createInteraction = async (request: PostInteraction) => {
    logger.debug({ request }, 'PostInteractionRepository -> createInteraction');
    return await this.postInteractionEntity.create(request);
  };

  updateInteraction = async (request: PostInteraction) => {
    logger.debug({ request }, 'PostInteractionRepository -> updateInteraction');
    return await this.postInteractionEntity.update(request);
  };

  deleteInteractionsByPostId = async (postId: string) => {
    logger.debug({ postId }, 'PostInteractionRepository -> deleteInteractionsByPostId');
    const interactions = await this.postInteractionEntity.query('postId').eq(postId).all().exec();
    logger.debug({ interactions }, 'Interactions');
    const interactionKeys = interactions.map((interaction) => ({ postId: interaction.postId, fulfillerId: interaction.fulfillerId }));
    await this.postInteractionEntity.batchDelete(interactionKeys);
  };
}

export default new PostInteractionRepository();
