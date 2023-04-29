export const postQuerySchema = `#graphql
    type Query {
        post(id: ID!): Post
        posts(startKey: String): [Post]!
        postsByUserId(userId: ID!): [Post]!
    }
`;
