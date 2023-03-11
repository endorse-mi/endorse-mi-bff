export const userTypeSchema = `#graphql
    input SignUpRequest {
        username: String!
        password: String!
        familyName: String!
        givenName: String!
        profile: String!
    }
`;
