import { confirmSignUp, forgotPassword, forgotPasswordSubmit, signIn, signUp } from './mutations';
import { user } from './queries';

export const userResolvers = {
  Query: {
    user,
  },
  Mutation: {
    signIn,
    signUp,
    confirmSignUp,
    forgotPassword,
    forgotPasswordSubmit,
  },
};
