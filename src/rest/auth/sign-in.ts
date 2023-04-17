import { signIn } from '../../services/user/auth';

export interface SignInRequest {
  username: string;
  password: string;
}

export const handler = async (request) => {
  const signInRequest: SignInRequest = JSON.parse(request.body);
  console.log(`Signing user ${signInRequest.username} in`);

  try {
    const user = await signIn(signInRequest);
    console.log(user);
    return {
      success: true,
      message: `Signed in user ${signInRequest.username}`,
      user: {
        username: user.getUsername(),
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
