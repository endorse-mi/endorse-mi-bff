export const paymentMutationSchema = `#graphql
    type Mutation {
        createCheckoutSession(priceId: String!): String!
    }
`;
