import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from '@graphql-tools/utils';
import { postResolvers } from './post';
import { postInteractionResolvers } from './post-interaction';
import { userResolvers } from './user';

export const resolvers: IResolvers = mergeResolvers([userResolvers, postResolvers, postInteractionResolvers]);
