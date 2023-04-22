import { UserCreateRequest, UserUpdateRequest } from '../../../dynamodb/model/user-model';
import userService from '../../../service/user-service';

export const createUser = async (parent, { request }: { request: UserCreateRequest }) => {
  try {
    const user = await userService.createUser(request);
    return {
      user,
      message: `Created user ${request.userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const updateUser = async (parent, { request }: { request: UserUpdateRequest }, context) => {
  console.log('context:', context);
  try {
    const user = await userService.updateUser(request);
    return {
      user,
      message: `Updated user ${request.userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const deleteUser = async (parent, { id }: { id: string }) => {
  try {
    await userService.deleteUser(id);
    return {
      message: `Deleted user ${id}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};
