export const postQuerySchema = `#graphql
    type Query {
        post(id: ID!): Post
        posts(input: PostsGetInput!): PostsResponse!
        postsByAuthorId(authorId: ID!): [Post!]!
    }
`;
