export const postInteractionTypeSchema = `#graphql
    enum InteractionState {
        CLAIMED
        CONFIRMED
        REJECTED
    }

    type PostInteraction {
        postId: String!
        userId: String!
        state: InteractionState!
    }
    
    type PostInteractionResponse implements BaseResponse {
        interaction: PostInteraction
        success: Boolean!
        message: String!
    }
`;
