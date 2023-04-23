import { UserCreateRequest, UserUpdateRequest } from '../dynamodb/model/user-model';
import UserRepository from '../dynamodb/repository/user-repository';
import CognitoService from './cognito-service';

export default class UserService {
  private readonly userRepository = new UserRepository();
  private readonly cognitoService = new CognitoService();

  getUserById = async (id: string) => {
    return await this.userRepository.getUserById(id);
  };

  getUserBalanceById = async (id: string) => {
    return await this.userRepository.getUserBalanceById(id);
  };

  createUser = async (request: UserCreateRequest) => {
    return await this.userRepository.createUser(request);
  };

  updateUser = async (request: UserUpdateRequest) => {
    return await this.userRepository.updateUser(request);
  };

  deleteUser = async (id: string) => {
    await this.cognitoService.deleteUser(id);
    await this.userRepository.deleteUser(id);
  };
}
