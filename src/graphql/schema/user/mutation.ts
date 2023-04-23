export const userMutationSchema = `#graphql
    type Mutation {
        createUser(request: UserCreateRequest): UserResponse
        updateUser(request: UserUpdateRequest): UserResponse
        deleteUser(id: ID!): UserBaseResponse
    }
`;
