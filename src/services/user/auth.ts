import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';
import { ConfirmSignUpRequest } from '../../rest/auth/confirm-sign-up';
import { ForgotPasswordRequest } from '../../rest/auth/forgot-password';
import { ForgotPasswordSubmitRequest } from '../../rest/auth/forgot-password-submit';
import { SignInRequest } from '../../rest/auth/sign-in';
import { SignUpRequest } from '../../rest/auth/sign-up';

const poolData = {
  UserPoolId: 'us-east-1_Pgspkqt3B',
  ClientId: '76kobkt3f4m1rl37s52i57opib',
};

export const userPool = new CognitoUserPool(poolData);

Amplify.configure({
  Auth: {
    userPoolId: poolData.UserPoolId,
    userPoolWebClientId: poolData.ClientId,
  },
});

export const signIn = async ({ username, password }: SignInRequest): Promise<CognitoUser> => {
  const user = await Auth.signIn(username, password);
  console.log('signed in:', user);
  return user;
};

export const signUp = async ({ username, password, familyName, givenName, profile }: SignUpRequest): Promise<CognitoUser> => {
  const { user } = await Auth.signUp({
    username,
    password,
  });

  console.log('signed up:', user);
  return user;
};

export const confirmSignUp = async ({ username, code }: ConfirmSignUpRequest) => {
  await Auth.confirmSignUp(username, code);
  console.log('confirmed sign up');
};

export const forgotPassword = async ({ username }: ForgotPasswordRequest) => {
  await Auth.forgotPassword(username);
  console.log('sent code');
};

export const forgotPasswordSubmit = async ({ username, password, code }: ForgotPasswordSubmitRequest) => {
  await Auth.forgotPasswordSubmit(username, code, password);
  console.log('reset password');
};
