export const postMutationSchema = `#graphql
    type Mutation {
        createPost(request: CreatePostRequest): CreatePostResponse
        deletePost(id: ID!): DeletePostResponse
    }
`;
