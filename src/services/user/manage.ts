import { UserCreateRequest, UserUpdateRequest } from '../../dynamodb/model/user-model';
import UserRepository from '../../dynamodb/repository/user-repository';

const userRepository = new UserRepository();

export const getUserById = async (id: string) => {
  return await userRepository.getUserById(id);
};

export const createUser = async (request: UserCreateRequest) => {
  return await userRepository.createUser(request);
};

export const updateUser = async (request: UserUpdateRequest) => {
  return await userRepository.updateUser(request);
};

export const deleteUser = async (id: string) => {
  await userRepository.deleteUser(id);
};