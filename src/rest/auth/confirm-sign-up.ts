import cognitoService from '../../service/cognito-service';
import { commonResponseFor } from '../utils/common';

export interface ConfirmSignUpRequest {
  username: string;
  code: string;
}

export const handler = async (request) => {
  const confirmSignUpRequest: ConfirmSignUpRequest = JSON.parse(request.body);

  try {
    await cognitoService.confirmSignUp(confirmSignUpRequest);
    return commonResponseFor({
      statusCode: 200,
      body: {
        success: true,
        message: `Confirmed sign up for user ${confirmSignUpRequest.username}`,
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
