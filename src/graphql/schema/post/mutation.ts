export const postMutationSchema = `#graphql
    type Mutation {
        createPost(request: PostCreateRequest): PostCreateResponse
        deletePost(id: ID!): PostDeleteResponse
    }
`;
