import { postMutationSchema } from './mutations';
import { postQuerySchema } from './queries';
import { postTypeSchema } from './types';

export const postSchemas = [postTypeSchema, postQuerySchema, postMutationSchema];
