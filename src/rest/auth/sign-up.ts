import cognitoService from '../../service/cognito-service';
import { commonResponseFor } from '../utils/common';

export interface SignUpRequest {
  username: string;
  password: string;
  familyName: string;
  givenName: string;
  profile: string;
}

export const handler = async (request) => {
  const signUpRequest: SignUpRequest = JSON.parse(request.body);

  try {
    const user = await cognitoService.signUp(signUpRequest);
    console.log(user);
    return commonResponseFor({
      statusCode: 201,
      body: {
        success: true,
        message: `Signed up user ${signUpRequest.username}`,
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
