import { confirmSignUp } from '../../services/user/auth';

export interface ConfirmSignUpRequest {
  username: string;
  code: string;
}

export const handler = async (request) => {
  const confirmSignUpRequest: ConfirmSignUpRequest = JSON.parse(request.body);

  try {
    await confirmSignUp(confirmSignUpRequest);
    return {
      success: true,
      message: `Confirmed sign up for user ${confirmSignUpRequest.username}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
