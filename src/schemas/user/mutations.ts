export const userMutationSchema = `#graphql
    type Mutation {
        signIn(request: SignInRequest): SignInResponse
        signUp(request: SignUpRequest): SignUpResponse
        confirmSignUp(request: ConfirmSignUpRequest): ConfirmSignUpResponse
        forgotPassword(request: ForgotPasswordRequest): ForgotPasswordResponse
        forgotPasswordSubmit(request: ForgotPasswordSubmitRequest): ForgotPasswordSubmitResponse
    }
`;
