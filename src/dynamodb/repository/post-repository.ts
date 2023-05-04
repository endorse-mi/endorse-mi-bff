import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import logger from '../../utils/logger';
import { Post, PostModel } from '../model/post-model';
import { PostSchema } from '../schema/post-schema';

class PostRepository {
  private readonly postEntity: Model<PostModel>;

  constructor() {
    this.postEntity = dynamoose.model<PostModel>('post-table-prod', PostSchema, { create: false, waitForActive: false });
  }

  getPosts = async (startKey?: string, limit = 10) => {
    logger.debug({ startKey, limit }, 'PostRepository -> getPosts');
    if (startKey) {
      return await this.postEntity.scan().startAt({ postId: startKey }).limit(limit).exec();
    }
    return await this.postEntity.scan().limit(limit).exec();
  };

  getPostById = async (id: string) => {
    logger.debug({ id }, 'PostRepository -> getPostById');
    return await this.postEntity.get({ postId: id });
  };

  getPostsByUserId = async (id: string) => {
    logger.debug({ id }, 'PostRepository -> getPostsByUserId');
    return await this.postEntity.query('userId').eq(id).exec();
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
