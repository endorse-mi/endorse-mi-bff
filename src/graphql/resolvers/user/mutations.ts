import { UserUpdateRequest } from '../../../dynamodb/model/user-model';
import { updateUser as dynamoUpdateUser } from '../../../services/user/manage';

export const updateUser = async (parent, { request }: { request: UserUpdateRequest }) => {
  try {
    const user = await dynamoUpdateUser(request);
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
