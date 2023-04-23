import { AdminDeleteUserCommand, CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';
import { ConfirmSignUpRequest } from '../rest/auth/confirm-sign-up';
import { ForgotPasswordRequest } from '../rest/auth/forgot-password';
import { ForgotPasswordSubmitRequest } from '../rest/auth/forgot-password-submit';
import { SignInRequest } from '../rest/auth/sign-in';
import { SignUpRequest } from '../rest/auth/sign-up';
import userService from './user-service';

const UserPoolId = 'us-east-1_KIHMSNLAY';
const poolData = {
  UserPoolId,
  ClientId: '6s0jgosqonq2k57gm6pftsv2td',
};

Amplify.configure({
  Auth: {
    userPoolId: poolData.UserPoolId,
    userPoolWebClientId: poolData.ClientId,
  },
});

class CognitoService {
  private readonly cognitoClient = new CognitoIdentityProviderClient({
    region: 'us-east-1',
  });

  signIn = async ({ username, password }: SignInRequest): Promise<CognitoUser> => {
    const user = await Auth.signIn(username, password);
    console.log('signed in:', user);
    return user;
  };

  signUp = async ({ username, password, familyName, givenName, profile }: SignUpRequest): Promise<CognitoUser> => {
    const { user } = await Auth.signUp({
      username,
      password,
    });

    await userService.createUser({ userId: username, familyName, givenName, profile });

    console.log('signed up:', JSON.stringify(user, null, 2));
    return user;
  };

  confirmSignUp = async ({ username, code }: ConfirmSignUpRequest) => {
    await Auth.confirmSignUp(username, code);
    console.log('confirmed sign up');
  };

  forgotPassword = async ({ username }: ForgotPasswordRequest) => {
    await Auth.forgotPassword(username);
    console.log('sent code');
  };

  forgotPasswordSubmit = async ({ username, password, code }: ForgotPasswordSubmitRequest) => {
    await Auth.forgotPasswordSubmit(username, code, password);
    console.log('reset password');
  };

  deleteUser = async (userId: string) => {
    const command = new AdminDeleteUserCommand({
      UserPoolId,
      Username: userId,
    });
    return await this.cognitoClient.send(command);
  };
}

export default new CognitoService();
