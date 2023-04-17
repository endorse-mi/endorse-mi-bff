export const postQuerySchema = `#graphql
    type Query {
        post: Post
        postsByUserId(userId: String!): [Post!]!
    }
`;
