import * as dynamoose from 'dynamoose';
import { SortOrder } from 'dynamoose/dist/General';
import { Model } from 'dynamoose/dist/Model';
import { ENVIRONMENT } from '../../environments';
import logger from '../../utils/logger';
import { Post, PostLastKey, PostModel, PostType } from '../model/post-model';
import { PostSchema } from '../schema/post-schema';

class PostRepository {
  private readonly postEntity: Model<PostModel>;

  constructor() {
    this.postEntity = dynamoose.model<PostModel>(`post-table-${ENVIRONMENT}`, PostSchema, { create: false, waitForActive: false });
  }

  getPosts = async (type: PostType, startKey?: PostLastKey, limit = 10) => {
    logger.debug({ type, startKey, limit }, 'PostRepository -> getPosts');
    if (startKey) {
      return await this.postEntity
        .query('type')
        .eq(type)
        .using('type-index')
        .sort(SortOrder.descending)
        .startAt(startKey)
        .limit(limit)
        .exec();
    }

    return await this.postEntity.query('type').eq(type).using('type-index').sort(SortOrder.descending).limit(limit).exec();
  };

  getPostById = async (id: string) => {
    logger.debug({ id }, 'PostRepository -> getPostById');
    return await this.postEntity.get({ postId: id });
  };

  getPostsByAuthorId = async (id: string) => {
    logger.debug({ id }, 'PostRepository -> getPostsByAuthorId');
    return await this.postEntity.query('authorId').eq(id).exec();
  };

  createPost = async (request: Post) => {
    logger.debug({ request }, 'PostRepository -> createPost');
    return await this.postEntity.create(request);
  };

  deletePost = async (id: string) => {
    logger.debug({ id }, 'PostRepository -> deletePost');
    await this.postEntity.delete(id);
  };

  setRemainingQuota = async (id: string, quota: number) => {
    logger.debug({ id, quota }, 'PostRepository -> setRemainingQuota');
    await this.postEntity.update({ postId: id, remainingQuota: quota });
  };

  setNConfirmed = async (id: string, nConfirmed: number) => {
    logger.debug({ id, nConfirmed }, 'PostRepository -> setNConfirmed');
    await this.postEntity.update({ postId: id, nConfirmed });
  };
}

export default new PostRepository();
