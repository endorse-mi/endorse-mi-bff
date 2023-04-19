export const userTypeSchema = `#graphql
    type User {
        userId: String!
        familyName: String!
        givenName: String!
        profile: String!
        createdAt: String!
        updatedAt: String!
    }

    type UserGetResponse implements BaseResponse {
        user: User
        success: Boolean!
        message: String!
    }

    input UserCreateRequest {
        userId: String!
        familyName: String!
        givenName: String!
        profile: String!
    }

    type UserCreateResponse implements BaseResponse {
        user: User
        success: Boolean!
        message: String!
    }

    input UserUpdateRequest {
        userId: String!
        familyName: String
        givenName: String
        profile: String
    }

    type UserUpdateResponse implements BaseResponse {
        user: User
        success: Boolean!
        message: String!
    }

    type UserDeleteResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
