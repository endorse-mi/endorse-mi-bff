export const postQuerySchema = `#graphql
    type Query {
        posts(startKey: String): [Post]!
        post(id: ID!): Post
        postsByUserId(userId: String!): [Post]!
    }
`;
