export const postMutationSchema = `#graphql
    type Mutation {
        addPost(post: AddPostRequest): AddPostResponse
    }
`;
