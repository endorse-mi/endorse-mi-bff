import { forgotPasswordSubmit } from '../../service/user/auth';

export interface ForgotPasswordSubmitRequest {
  username: string;
  password: string;
  code: string;
}

export const handler = async (request) => {
  const forgotPasswordSubmitRequest: ForgotPasswordSubmitRequest = JSON.parse(request.body);

  try {
    await forgotPasswordSubmit(forgotPasswordSubmitRequest);
    return {
      success: true,
      message: `Reset forgotten password for user ${forgotPasswordSubmitRequest.username}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
