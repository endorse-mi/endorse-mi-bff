export const postInteractionTypeSchema = `#graphql
    enum InteractionState {
        CLAIMED
        CONFIRMED
    }

    type PostInteraction {
        postId: String!
        userId: String!
        state: InteractionState!
    }

    input UpsertPostInteractionRequest {
        postId: String!
        userId: String!
        state: InteractionState!
    }

    type UpsertPostInteractionResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
