export const postInteractionQuerySchema = `#graphql
    type Query {
        postInteraction(postId: ID!, fulfillerId: ID!): PostInteraction
        postInteractionsByPostId(postId: ID!): [PostInteraction]!
    }
`;
