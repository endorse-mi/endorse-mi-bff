export const userQuerySchema = `#graphql
    type Query {
        user(id: ID!): UserResponse
    }
`;
