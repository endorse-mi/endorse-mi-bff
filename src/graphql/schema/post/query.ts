export const postQuerySchema = `#graphql
    type Query {
        post(id: String!): Post
        posts(startKey: String): [Post]!
        postsByUserId(userId: String!): [Post]!
    }
`;
