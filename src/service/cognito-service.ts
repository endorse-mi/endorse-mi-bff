import { AdminDeleteUserCommand, CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';
import { COGNITO_CLIENT_ID, COGNITO_POOL_ID } from '../environments';
import { ConfirmSignUpRequest } from '../rest/auth/confirm-sign-up';
import { ForgotPasswordRequest } from '../rest/auth/forgot-password';
import { ForgotPasswordSubmitRequest } from '../rest/auth/forgot-password-submit';
import { SignInRequest } from '../rest/auth/sign-in';
import { SignUpRequest } from '../rest/auth/sign-up';
import balanceService, { INVITATION_AWARD } from './balance-service';
import userService from './user-service';

const poolData = {
  UserPoolId: COGNITO_POOL_ID,
  ClientId: COGNITO_CLIENT_ID,
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

  confirmSignUp = async ({ username, code, invitorId }: ConfirmSignUpRequest) => {
    await Auth.confirmSignUp(username, code);
    try {
      const user = await userService.getUserById(invitorId);
      if (user && username !== invitorId) {
        await balanceService.changeUserBalance(invitorId, INVITATION_AWARD);
        await balanceService.changeUserBalance(username, INVITATION_AWARD);
      }
    } catch (err) {}
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
      UserPoolId: COGNITO_POOL_ID,
      Username: userId,
    });
    return await this.cognitoClient.send(command);
  };
}

export default new CognitoService();
