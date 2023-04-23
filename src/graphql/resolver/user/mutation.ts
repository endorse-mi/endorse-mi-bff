import { UserCreateRequest, UserUpdateRequest } from '../../../dynamodb/model/user-model';
import userService from '../../../service/user-service';
import { requireAdmin, requireSameUser } from '../../../utils/authorization';

export const createUser = async (parent, { request }: { request: UserCreateRequest }, context) => {
  try {
    requireAdmin(context.userId);
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
  try {
    requireSameUser(context.userId, request.userId);
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
  try {
    requireSameUser(context.userId, id);
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
