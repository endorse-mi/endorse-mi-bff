export const postInteractionMutationSchema = `#graphql
    type Mutation {
        upsertPostInteraction(request: UpsertPostInteractionRequest): UpsertPostInteractionResponse
        claimPostInteraction(postId: String!, userId: String!): UpsertPostInteractionResponse
        confirmPostInteraction(postId: String!, userId: String!): UpsertPostInteractionResponse
        rejectPostInteraction(postId: String!, userId: String!): UpsertPostInteractionResponse
    }
`;
