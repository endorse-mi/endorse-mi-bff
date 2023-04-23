export const ADMIN_USER_ID = 'fongchinghinstephen@gmail.com';

export const requireAdmin = (userId: string) => {
  if (userId !== ADMIN_USER_ID) {
    throw new Error(`The user ${userId} is not authorized to access this resource`);
  }
};

export const requireSameUser = (userId1: string, userId2: string) => {
  if (userId1 !== userId2) {
    throw new Error(`The user ${userId1} is not authorized to access this resource`);
  }
};

export const requireDifferentUser = (userId1: string, userId2: string) => {
  if (userId1 === userId2) {
    throw new Error(`The user ${userId1} is not authorized to access this resource`);
  }
};
