import { UserCreateInput, UserUpdateInput } from '../../../dynamodb/model/user-model';
import userService from '../../../service/user-service';
import { requireAdmin, requireSameUser } from '../../../utils/authorization';

export const createUser = async (parent, { input }: { input: UserCreateInput }, context) => {
  try {
    requireAdmin(context.userId);
    const user = await userService.createUser(input);
    return {
      user,
      message: `Created user ${input.userId}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};

export const updateUser = async (parent, { input }: { input: UserUpdateInput }, context) => {
  try {
    requireSameUser(context.userId, input.userId);
    const user = await userService.updateUser(input);
    return {
      user,
      message: `Updated user ${input.userId}`,
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
