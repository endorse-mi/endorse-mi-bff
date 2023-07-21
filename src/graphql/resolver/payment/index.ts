import { createCheckoutSession } from './mutation';

export const paymentResolvers = {
  Query: {},
  Mutation: {
    createCheckoutSession,
  },
};
