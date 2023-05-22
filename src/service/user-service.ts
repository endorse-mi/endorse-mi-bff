import { UserCreateInput, UserUpdateInput } from '../dynamodb/model/user-model';
import userRepository from '../dynamodb/repository/user-repository';
import cognitoService from './cognito-service';

class UserService {
  getUserById = async (id: string) => {
    return await userRepository.getUserById(id);
  };

  getUserBalanceById = async (id: string) => {
    return await userRepository.getUserBalanceById(id);
  };

  createUser = async (request: UserCreateInput) => {
    return await userRepository.createUser(request);
  };

  updateUser = async (request: UserUpdateInput) => {
    return await userRepository.updateUser(request);
  };

  deleteUser = async (id: string) => {
    const user = this.getUserById(id);
    if (!user) {
      throw new Error("User doesn't exist");
    }
    await cognitoService.deleteUser(id);
    await userRepository.deleteUser(id);
    return user;
  };
}

export default new UserService();
