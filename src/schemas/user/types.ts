export const userTypeSchema = `#graphql
    type User {
        username: String
    }

    input SignUpRequest {
        username: String!
        password: String!
        familyName: String!
        givenName: String!
        profile: String!
    }

    type SignUpResponse implements BaseResponse {
        success: Boolean!
        message: String!
        user: User
    }
`;
