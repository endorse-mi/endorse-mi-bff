import { userMutationSchema } from './mutation';
import { userQuerySchema } from './query';
import { userTypeSchema } from './type';

export const userSchemas = [userTypeSchema, userQuerySchema, userMutationSchema];
