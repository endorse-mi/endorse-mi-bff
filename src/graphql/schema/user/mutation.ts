export const userMutationSchema = `#graphql
    type Mutation {
        createUser(request: UserCreateRequest): UserCreateResponse
        updateUser(request: UserUpdateRequest): UserUpdateResponse
        deleteUser(id: String): UserDeleteResponse
    }
`;
