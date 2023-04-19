import { postMutationSchema } from './mutation';
import { postQuerySchema } from './query';
import { postTypeSchema } from './type';

export const postSchemas = [postTypeSchema, postQuerySchema, postMutationSchema];
