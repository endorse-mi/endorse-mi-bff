import { ADMIN_USER_ID } from '../../../config';
import { UserCreateRequest, UserUpdateRequest } from '../../../dynamodb/model/user-model';
import UserService from '../../../service/user-service';

const userService = new UserService();

export const createUser = async (parent, { request }: { request: UserCreateRequest }, context) => {
  if (context.userId !== ADMIN_USER_ID) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
      success: false,
    };
  }

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
  if (context.userId !== request.userId) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
      success: false,
    };
  }

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

export const deleteUser = async (parent, { id }: { id: string }, context) => {
  if (context.userId !== id) {
    return {
      message: `The user ${context.userId as string} is not authenticated to access this resource`,
      success: false,
    };
  }

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
