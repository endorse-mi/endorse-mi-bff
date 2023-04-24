export const userMutationSchema = `#graphql
    type Mutation {
        createUser(request: UserCreateInput!): UserResponse
        updateUser(request: UserUpdateInput!): UserResponse
        deleteUser(id: ID!): UserResponse
    }
`;
