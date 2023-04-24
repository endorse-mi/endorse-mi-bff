export const postMutationSchema = `#graphql
    type Mutation {
        createPost(request: PostCreateInput!): PostResponse
        deletePost(id: ID!): PostResponse
    }
`;
