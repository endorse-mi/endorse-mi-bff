export const userQuerySchema = `#graphql
    type Query {
        user(id: String!): UserGetResponse
    }
`;