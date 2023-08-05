import { UserCreateInput, UserUpdateInput } from '../dynamodb/model/user-model';
import userRepository from '../dynamodb/repository/user-repository';
import logger from '../utils/logger';
import cognitoService from './cognito-service';

class UserService {
  getUserById = async (id: string) => {
    logger.debug({ id }, 'UserService -> getUserById');
    return await userRepository.getUserById(id);
  };

  getUserBalanceById = async (id: string) => {
    logger.debug({ id }, 'UserService -> getUserBalanceById');
    return await userRepository.getUserBalanceById(id);
  };

  createUser = async (request: UserCreateInput) => {
    logger.debug({ request }, 'UserService -> createUser');
    return await userRepository.createUser(request);
  };

  updateUser = async (request: UserUpdateInput) => {
    logger.debug({ request }, 'UserService -> updateUser');
    return await userRepository.updateUser(request);
  };

  deleteUser = async (id: string) => {
    logger.debug({ id }, 'UserService -> deleteUser');
    const user = this.getUserById(id);

    await cognitoService.deleteUser(id);
    await userRepository.deleteUser(id);
    return user;
  };
}

export default new UserService();
