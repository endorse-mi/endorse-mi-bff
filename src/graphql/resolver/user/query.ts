import userService from '../../../service/user-service';
import logger from '../../../utils/logger';

export const user = async (parent: any, { id }: { id: string }) => {
  logger.info({ id }, 'Getting user by id');
  try {
    const { userId, familyName, givenName, profile, createdAt, updatedAt } = await userService.getUserById(id);
    return {
      user: {
        userId,
        familyName,
        givenName,
        profile,
        createdAt,
        updatedAt,
      },
      message: `Found user ${id}`,
      success: true,
    };
  } catch (err) {
    return {
      message: err.message,
      success: false,
    };
  }
};
