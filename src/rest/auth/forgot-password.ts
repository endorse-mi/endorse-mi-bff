import { forgotPassword } from '../../services/user/auth';

export interface ForgotPasswordRequest {
  username: string;
}

export const handler = async (request) => {
  const forgotPasswordRequest: ForgotPasswordRequest = JSON.parse(request.body);

  try {
    await forgotPassword(forgotPasswordRequest);
    return {
      success: true,
      message: `Sent forgot password email to user ${forgotPasswordRequest.username}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
