import {
  confirmSignUp as cognitoConfirmSignUp,
  ConfirmSignUpAttributes,
  forgotPassword as cognitoForgotPassword,
  ForgotPasswordAttributes,
  forgotPasswordSubmit as cognitoForgotPasswordSubmit,
  ForgotPasswordSubmitAttributes,
  signIn as cognitoSignIn,
  SignInAttributes,
  signUp as cognitoSignUp,
  SignUpAttributes,
} from '../../services/user/auth';

interface SignInRequest {
  request: SignInAttributes;
}

interface SignUpRequest {
  request: SignUpAttributes;
}

interface ConfirmSignUpRequest {
  request: ConfirmSignUpAttributes;
}

interface ForgotPasswordRequest {
  request: ForgotPasswordAttributes;
}

interface ForgotPasswordSubmitRequest {
  request: ForgotPasswordSubmitAttributes;
}

export const signIn = async (parent: never, { request }: SignInRequest) => {
  console.log(`Signing user ${request.username} in`);
  try {
    const user = await cognitoSignIn({ ...request });
    console.log(user);
    return {
      success: true,
      message: `Signed in user ${request.username}`,
      user: {
        username: user.getUsername(),
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const signUp = async (parent: never, { request }: SignUpRequest) => {
  try {
    const user = await cognitoSignUp({ ...request });
    console.log(user);
    return {
      success: true,
      message: `Signed up user ${request.username}`,
      user: {
        username: user.getUsername(),
      },
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const confirmSignUp = async (parent: never, { request }: ConfirmSignUpRequest) => {
  try {
    await cognitoConfirmSignUp({ ...request });
    return {
      success: true,
      message: `Confirmed sign up for user ${request.username}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const forgotPassword = async (parent: never, { request }: ForgotPasswordRequest) => {
  try {
    await cognitoForgotPassword({ ...request });
    return {
      success: true,
      message: `Sent forgot password email to user ${request.username}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export const forgotPasswordSubmit = async (parent: never, { request }: ForgotPasswordSubmitRequest) => {
  try {
    await cognitoForgotPasswordSubmit({ ...request });
    return {
      success: true,
      message: `Reset forgotten password for user ${request.username}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
