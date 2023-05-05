export const postInteractionTypeSchema = `#graphql
    enum PostInteractionState {
        CLAIMED
        CONFIRMED
        REJECTED
    }

    type PostInteraction {
        postId: ID!
        fulfillerId: ID!
        state: PostInteractionState!
        fulfiller: User!
    }

    type PostInteractionResponse implements BaseResponse {
        interaction: PostInteraction
        success: Boolean!
        message: String!
    }
`;
