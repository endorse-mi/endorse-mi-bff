import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { Post, PostModel } from '../model/post-model';
import { PostSchema } from '../schema/post-schema';

class PostRepository {
  private readonly postEntity: Model<PostModel>;

  constructor() {
    this.postEntity = dynamoose.model<PostModel>('post-table-prod', PostSchema, { create: false, waitForActive: false });
  }

  getPosts = async (startKey?: string, limit = 10) => {
    if (startKey) {
      return await this.postEntity.scan().startAt({ postId: startKey }).limit(limit).exec();
    }
    return await this.postEntity.scan().limit(limit).exec();
  };

  getPostById = async (id: string) => {
    return await this.postEntity.get({ postId: id });
  };

  getPostsByUserId = async (id: string) => {
    return await this.postEntity.query('userId').eq(id).exec();
  };

  createPost = async (request: Post) => {
    return await this.postEntity.create(request);
  };

  deletePost = async (id: string) => {
    await this.postEntity.delete(id);
  };

  setRemainingQuota = async (id: string, quota: number) => {
    await this.postEntity.update({ postId: id, remainingQuota: quota });
  };
}

export default new PostRepository();
