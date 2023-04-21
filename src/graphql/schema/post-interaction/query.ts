export const postInteractionQuerySchema = `#graphql
    type Query {
        postInteraction(postId: ID!, userId: ID!): PostInteraction
    }
`;
