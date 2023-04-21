import { forgotPassword } from '../../service/user/auth';
import { commonResponseFor } from '../utils/common';

export interface ForgotPasswordRequest {
  username: string;
}

export const handler = async (request) => {
  const forgotPasswordRequest: ForgotPasswordRequest = JSON.parse(request.body);

  try {
    await forgotPassword(forgotPasswordRequest);
    return commonResponseFor({
      statusCode: 200,
      body: {
        success: true,
        message: `Sent forgot password email to user ${forgotPasswordRequest.username}`,
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
