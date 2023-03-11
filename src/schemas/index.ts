import { userSchemas } from './user';

const commonSchema = `#graphql
  interface BaseResponse {
    success: Boolean!
    message: String!
  }
`;

export const typeDefs = [commonSchema, ...userSchemas];
