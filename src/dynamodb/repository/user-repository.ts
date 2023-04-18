import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { UserCreateRequest, UserModel, UserUpdateRequest } from '../model/user-model';
import { UserSchema } from '../schema/user-schema';

export default class UserRepository {
  private readonly userEntity: Model<UserModel>;

  constructor() {
    this.userEntity = dynamoose.model<UserModel>('user-table-prod', UserSchema);
  }

  getUserById = async (id: string) => {
    return await this.userEntity.get({ userId: id });
  };

  createUser = async (request: UserCreateRequest) => {
    return await this.userEntity.create(request);
  };

  updateUser = async (request: UserUpdateRequest) => {
    return await this.userEntity.update(request);
  };

  deleteUser = async (id: string) => {
    await this.userEntity.delete(id);
  };
}
