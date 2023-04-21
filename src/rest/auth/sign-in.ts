import { signIn } from '../../service/user/auth';
import { commonResponseFor } from '../utils/common';

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
    return commonResponseFor({
      statusCode: 200,
      body: {
        success: true,
        message: `Signed in user ${signInRequest.username}`,
        user: {
          username: user.getUsername(),
        },
      },
    });
  } catch (err) {
    return commonResponseFor({
      statusCode: 403,
      body: {
        success: false,
        message: err.message,
      },
    });
  }
};
