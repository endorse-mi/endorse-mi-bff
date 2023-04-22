export const postInteractionMutationSchema = `#graphql
    type Mutation {
        upsertPostInteraction(request: UpsertPostInteractionRequest): UpsertPostInteractionResponse
    }
`;
