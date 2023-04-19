export const postQuerySchema = `#graphql
    type Query {
        post(id: ID!): Post
        postsByUserId(userId: String!): [Post]!
    }
`;
