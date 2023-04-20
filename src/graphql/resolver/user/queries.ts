import { getUserById } from '../../../dynamodb/service/user-service';

export const user = async (parent: any, { id }: { id: string }) => {
  console.log(`Getting user by id ${id}`);
  try {
    const { userId, familyName, givenName, profile, createdAt, updatedAt } = await getUserById(id);
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
