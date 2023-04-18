import { getUserById } from '../../../services/user/manage';

export const user = async (parent: any, id: string) => {
  try {
    const user = await getUserById(id);
    return {
      user,
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
