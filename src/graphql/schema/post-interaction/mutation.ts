export const postInteractionMutationSchema = `#graphql
    type Mutation {
        upsertInteraction(request: UpsertPostInteractionRequest): UpsertPostInteractionResponse
    }
`;
