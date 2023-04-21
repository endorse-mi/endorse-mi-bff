import { forgotPasswordSubmit } from '../../service/user/auth';
import { commonResponseFor } from '../utils/common';

export interface ForgotPasswordSubmitRequest {
  username: string;
  password: string;
  code: string;
}

export const handler = async (request) => {
  const forgotPasswordSubmitRequest: ForgotPasswordSubmitRequest = JSON.parse(request.body);

  try {
    await forgotPasswordSubmit(forgotPasswordSubmitRequest);
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
