import UserService from '../../../service/user-service';

const userService = new UserService();

export const user = async (parent: any, { id }: { id: string }) => {
  console.log(`Getting user by id ${id}`);
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
