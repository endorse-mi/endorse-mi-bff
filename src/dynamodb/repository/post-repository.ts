import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { v4 as uuidv4 } from 'uuid';
import { PostCreateRequest, PostModel } from '../model/post-model';
import { PostSchema } from '../schema/post-schema';

export default class PostRepository {
  private readonly postEntity: Model<PostModel>;

  constructor() {
    this.postEntity = dynamoose.model<PostModel>('post-table-prod', PostSchema);
  }

  getPostById = async (id: string) => {
    return await this.postEntity.get({ postId: id });
  };

  createPost = async (request: PostCreateRequest) => {
    return await this.postEntity.create({ postId: uuidv4(), ...request });
  };

  deletePost = async (id: string) => {
    await this.postEntity.delete(id);
  };

  getPostsByUserId = async (id: string) => {
    return await this.postEntity.query('userId').eq(id).exec();
  };
}
