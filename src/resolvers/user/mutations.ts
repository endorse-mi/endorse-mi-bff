import { signUpCognitoUser, type SignUpAttributes } from '../../aws/cognito';

interface SignUpRequest {
  request: SignUpAttributes;
}

export const signUp = async (parent: never, { request }: SignUpRequest) => {
  const user = await signUpCognitoUser({ ...request });
  console.log(user);
  return {
    success: true,
    message: 'some-message',
    user: {
      username: user?.getUsername(),
    },
  };
};
