export const userTypeSchema = `#graphql
    type User {
        userId: String!
        familyName: String!
        givenName: String!
        profile: String!
        createdAt: String!
        updatedAt: String!
    }

    type UserResponse implements BaseResponse {
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

    input UserUpdateRequest {
        userId: String!
        familyName: String
        givenName: String
        profile: String
    }

    type UserDeleteResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
