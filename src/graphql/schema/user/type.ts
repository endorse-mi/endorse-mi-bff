export const userTypeSchema = `#graphql
    type User {
        userId: ID!
        familyName: String!
        givenName: String!
        profile: String!
        headline: String
        balance: String!
        createdAt: String!
        updatedAt: String!
    }

    type UserResponse implements BaseResponse {
        user: User
        success: Boolean!
        message: String!
    }

    input UserCreateInput {
        userId: ID!
        familyName: String!
        givenName: String!
        profile: String!
    }

    input UserUpdateInput {
        userId: ID!
        familyName: String
        givenName: String
        profile: String
        headline: String
    }
`;
