export const userMutationSchema = `#graphql
    type Mutation {
        createUser(input: UserCreateInput!): UserResponse
        updateUser(input: UserUpdateInput!): UserResponse
        deleteUser(id: ID!): UserResponse
    }
`;
