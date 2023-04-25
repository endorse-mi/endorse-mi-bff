import userService from '../../../service/user-service';
import logger from '../../../utils/logger';

export const user = async (parent: any, { id }: { id: string }) => {
  logger.info({ id }, 'Getting user by id');
  const user = await userService.getUserById(id);
  return user;
};
