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

    input SignInRequest {
        username: String!
        password: String!
    }

    type SignInResponse implements BaseResponse {
        success: Boolean!
        message: String!
        user: User
    }

    input ConfirmSignUpRequest {
        username: String!
        code: String!
    }

    type ConfirmSignUpResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }

    input ForgotPasswordRequest {
        username: String!
    }

    type ForgotPasswordResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }

    input ForgotPasswordSubmitRequest {
        username: String!
        password: String!
        code: String!
    }

    type ForgotPasswordSubmitResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
