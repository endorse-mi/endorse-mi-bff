import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

export interface SignInAttributes {
  username: string;
  password: string;
}

export interface SignUpAttributes {
  username: string;
  password: string;
  familyName: string;
  givenName: string;
  profile: string;
}

export interface ConfirmSignUpAttributes {
  username: string;
  code: string;
}

export interface ForgotPasswordAttributes {
  username: string;
}

export interface ForgotPasswordSubmitAttributes {
  username: string;
  password: string;
  code: string;
}

export const signIn = async ({ username, password }: SignInAttributes): Promise<CognitoUser> => {
  const user = await Auth.signIn(username, password);
  console.log('signed in:', user);
  return user;
};

export const signUp = async ({ username, password, familyName, givenName, profile }: SignUpAttributes): Promise<CognitoUser> => {
  const { user } = await Auth.signUp({
    username,
    password,
    attributes: {
      family_name: familyName,
      given_name: givenName,
      profile,
    },
  });

  console.log('signed up:', user);
  return user;
};

export const confirmSignUp = async ({ username, code }: ConfirmSignUpAttributes) => {
  await Auth.confirmSignUp(username, code);
  console.log('confirmed sign up');
};

export const forgotPassword = async ({ username }: ForgotPasswordAttributes) => {
  await Auth.forgotPassword(username);
  console.log('sent code');
};

export const forgotPasswordSubmit = async ({ username, password, code }: ForgotPasswordSubmitAttributes) => {
  await Auth.forgotPasswordSubmit(username, code, password);
  console.log('reset password');
};
