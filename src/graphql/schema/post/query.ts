export const postQuerySchema = `#graphql
    type Query {
        post(id: ID!): Post
        posts(input: PostsGetInput!): [Post]!
        postsByAuthorId(authorId: ID!): [Post]!
    }
`;
