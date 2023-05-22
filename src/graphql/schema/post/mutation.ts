export const postMutationSchema = `#graphql
    type Mutation {
        createPost(input: PostCreateInput!): PostResponse
        deletePost(id: ID!): PostResponse
    }
`;
