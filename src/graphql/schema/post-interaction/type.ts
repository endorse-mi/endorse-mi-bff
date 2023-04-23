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

    input PostInteractionUpsertRequest {
        postId: String!
        userId: String!
        state: InteractionState!
    }

    type PostInteractionUpsertResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
