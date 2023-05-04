export const postInteractionTypeSchema = `#graphql
    enum PostInteractionState {
        CLAIMED
        CONFIRMED
        REJECTED
    }

    type PostInteraction {
        postId: ID!
        userId: ID!
        state: PostInteractionState!
    }

    type PostInteractionResponse implements BaseResponse {
        interaction: PostInteraction
        success: Boolean!
        message: String!
    }
`;
