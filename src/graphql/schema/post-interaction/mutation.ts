export const postInteractionMutationSchema = `#graphql
    type Mutation {
        upsertPostInteraction(request: PostInteractionUpsertRequest): PostInteractionUpsertResponse
        claimPostInteraction(postId: String!, userId: String!): PostInteractionUpsertResponse
        confirmPostInteraction(postId: String!, userId: String!): PostInteractionUpsertResponse
        rejectPostInteraction(postId: String!, userId: String!): PostInteractionUpsertResponse
    }
`;
