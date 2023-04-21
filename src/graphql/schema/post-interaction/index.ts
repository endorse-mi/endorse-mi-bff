import { postInteractionMutationSchema } from './mutation';
import { postInteractionQuerySchema } from './query';
import { postInteractionTypeSchema } from './type';

export const postInteractionSchemas = [postInteractionTypeSchema, postInteractionQuerySchema, postInteractionMutationSchema];
