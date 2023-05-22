import * as dynamoose from 'dynamoose';
import { Model } from 'dynamoose/dist/Model';
import { INITIAL_BALANCE } from '../../service/balance-service';
import { UserCreateInput, UserModel, UserUpdateInput } from '../model/user-model';
import { UserSchema } from '../schema/user-schema';

class UserRepository {
  private readonly userEntity: Model<UserModel>;

  constructor() {
    // Set { create: false, waitForActive: false } so that the function doesn't need CreateTable and DescribeTable permissions.
    this.userEntity = dynamoose.model<UserModel>('user-table-prod', UserSchema, { create: false, waitForActive: false });
  }

  getUserById = async (id: string) => {
    return await this.userEntity.get({ userId: id });
  };

  getUserBalanceById = async (id: string) => {
    return (await this.userEntity.get({ userId: id }, { attributes: ['balance'] })).balance;
  };

  createUser = async (request: UserCreateInput) => {
    return await this.userEntity.create({ balance: INITIAL_BALANCE, ...request });
  };

  updateUser = async (request: UserUpdateInput) => {
    return await this.userEntity.update(request);
  };

  deleteUser = async (id: string) => {
    await this.userEntity.delete(id);
  };

  updateUserBalance = async (userId: string, newBalance: number) => {
    return await this.userEntity.update({ userId }, { balance: newBalance });
  };
}

export default new UserRepository();
