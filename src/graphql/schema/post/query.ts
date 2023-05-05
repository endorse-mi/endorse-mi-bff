export const postQuerySchema = `#graphql
    type Query {
        post(id: ID!): Post
        posts(startKey: ID): [Post]!
        postsByAuthorId(authorId: ID!): [Post]!
    }
`;
