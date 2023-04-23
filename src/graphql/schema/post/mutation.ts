export const postMutationSchema = `#graphql
    type Mutation {
        createPost(request: PostCreateRequest): PostResponse
        deletePost(id: ID!): PostBaseResponse
    }
`;
