export const postInteractionMutationSchema = `#graphql
    type Mutation {
        """
        Call by users to claim they have fulfilled the request.
        """
        claimPostInteraction(postId: ID!): PostInteractionResponse

        """
        Call by the author of the post to confirm a user has fulfilled the request.
        """
        confirmPostInteraction(postId: ID!, fulfillerId: ID!): PostInteractionResponse

        """
        Call by the author of the post to reject a user's claim.
        """
        rejectPostInteraction(postId: ID!, fulfillerId: ID!): PostInteractionResponse
    }
`;
