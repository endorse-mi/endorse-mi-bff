import { type IResolvers } from '@graphql-tools/utils';

import { mergeResolvers } from '@graphql-tools/merge';
import { postResolvers } from './post';
import { userResolvers } from './user';

export const resolvers: IResolvers = mergeResolvers([userResolvers, postResolvers]);