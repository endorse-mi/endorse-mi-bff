import CognitoService from '../../service/cognito-service';
import { commonResponseFor } from '../utils/common';

const cognitoService = new CognitoService();

export interface SignInRequest {
  username: string;
  password: string;
}

export const handler = async (request) => {
  const signInRequest: SignInRequest = JSON.parse(request.body);
  console.log(`Signing user ${signInRequest.username} in`);

  try {
    const user = await cognitoService.signIn(signInRequest);
    return commonResponseFor({
      statusCode: 200,
      body: {
        success: true,
        message: `Signed in user ${signInRequest.username}`,
        user,
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
