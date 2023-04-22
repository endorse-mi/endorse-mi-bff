import { AdminDeleteUserCommand, CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';
import { ConfirmSignUpRequest } from '../rest/auth/confirm-sign-up';
import { ForgotPasswordRequest } from '../rest/auth/forgot-password';
import { ForgotPasswordSubmitRequest } from '../rest/auth/forgot-password-submit';
import { SignInRequest } from '../rest/auth/sign-in';
import { SignUpRequest } from '../rest/auth/sign-up';
import { createUser } from './user-service';

const UserPoolId = 'us-east-1_KIHMSNLAY';
const poolData = {
  UserPoolId,
  ClientId: '6s0jgosqonq2k57gm6pftsv2td',
};

export const userPool = new CognitoUserPool(poolData);

Amplify.configure({
  Auth: {
    userPoolId: poolData.UserPoolId,
    userPoolWebClientId: poolData.ClientId,
  },
});

const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
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

  await createUser({ userId: username, familyName, givenName, profile });

  console.log('signed up:', JSON.stringify(user, null, 2));
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

export const deleteUser = async (userId: string) => {
  const command = new AdminDeleteUserCommand({
    UserPoolId,
    Username: userId,
  });
  return await cognitoClient.send(command);
};

export default {
  signIn,
  signUp,
  confirmSignUp,
  forgotPassword,
  forgotPasswordSubmit,
  deleteUser,
};
