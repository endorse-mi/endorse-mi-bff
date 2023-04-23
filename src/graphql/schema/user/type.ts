export const userTypeSchema = `#graphql
    type User {
        userId: ID!
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
        userId: ID!
        familyName: String!
        givenName: String!
        profile: String!
    }

    input UserUpdateRequest {
        userId: ID!
        familyName: String
        givenName: String
        profile: String
    }

    type UserBaseResponse implements BaseResponse {
        success: Boolean!
        message: String!
    }
`;
