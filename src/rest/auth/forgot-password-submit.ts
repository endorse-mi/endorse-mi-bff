import CognitoService from '../../service/cognito-service';
import { commonResponseFor } from '../utils/common';

const cognitoService = new CognitoService();

export interface ForgotPasswordSubmitRequest {
  username: string;
  password: string;
  code: string;
}

export const handler = async (request) => {
  const forgotPasswordSubmitRequest: ForgotPasswordSubmitRequest = JSON.parse(request.body);

  try {
    await cognitoService.forgotPasswordSubmit(forgotPasswordSubmitRequest);
    return commonResponseFor({
      statusCode: 200,
      body: {
        success: true,
        message: `Reset forgotten password for user ${forgotPasswordSubmitRequest.username}`,
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
