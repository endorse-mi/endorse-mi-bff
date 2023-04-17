import { userMutationSchema } from './mutations';
import { userQuerySchema } from './queries';
import { userTypeSchema } from './types';

export const userSchemas = [userTypeSchema, userQuerySchema, userMutationSchema];
